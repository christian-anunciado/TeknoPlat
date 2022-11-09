import React, { useEffect } from 'react'
import { AgoraVideoPlayer, createScreenVideoTrack } from 'agora-rtc-react'
import { useClient, useMicrophoneAndCameraTracks, config, channelName, useScreenShare, uid } from '../../assets/js/Mod6/settings'
import Controls from './Controls'
import { useState } from 'react'
import Video from './Video'


const Stream = () => {
    const [users, setUsers] = useState([])
    const [remoteUsers, setRemoteUsers] = useState([])
    const [start, setStart] = useState(false)
    const [inCall, setInCall] = useState(false)
    const client = useClient()
    const { ready, tracks } = useMicrophoneAndCameraTracks()
    const [localTracks, setLocalTracks] = useState([]) // Handles tracks from local users

    const init = async (name) => {
        client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType)
            if (mediaType === "video") {

                setRemoteUsers((prev) => {
                    return [...prev, user]
                })
            }

            if (mediaType === "audio") {
                user.audioTrack.play()
            }


        })

        client.on("user-unpublished", async (user, mediaType) => {
            if (mediaType === 'audio') {
                if (user.audioTrack) user.audioTrack.stop();
            }

            if (mediaType === 'video') {
                setUsers((prev) => {
                    return prev.filter((users) => users.uid !== user.uid)
                })
            }
        })

        client.on("user-left", (user) => {
            setUsers((prev) => {
                return prev.filter((users) => users.uid !== user.uid)
            })
        })

        try {
            await client.join(config.appId, name, config.token, uid)
        } catch (err) {
            console.log(err);
        }

        if (tracks) {
            setLocalTracks(tracks)
            await client.publish([localTracks[0], localTracks[1]])
        }

        setStart(true)
        setInCall(true)


    }

    useEffect(() => {
        if (ready && tracks) {
            try {
                init(channelName)
            } catch (err) {
                console.log(err);
            }
        }


    }, [channelName, client, ready, tracks, localTracks[1]])

    useEffect(() => {
        const usersInfo = [...new Map(remoteUsers.map(item => [item['uid'], item])).values()]
        setUsers(usersInfo)
    }, [remoteUsers])

    return (
        <section id="stream__container">
            {start && tracks && (
                <Video localTracks={localTracks} setStart={start} setInCall={inCall} users={users} />
            )
            }


            {ready && tracks && (
                <Controls localTracks={localTracks} setLocalTracks={setLocalTracks} setStart={setStart} setInCall={setInCall} />
            )
            }
        </section>


    )
}

export default Stream