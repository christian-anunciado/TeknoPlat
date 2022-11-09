import { AgoraVideoPlayer } from 'agora-rtc-react'
import React, { useEffect, useRef, useState } from 'react'
import { uid } from '../../assets/js/Mod6/settings';

function Video(props) {
    const { users, setLocalTracks, localTracks } = props

    console.log("Users: ", users);

    const expandedFrame = useRef()
    const streamsContainer = useRef()
    const videoFrames = useRef([])
    let currentUser_inExpandedFrame = null;



    useEffect(() => {
        if (videoFrames.current.length > 0 && expandedFrame.current.style.display) {
            videoFrames.current[videoFrames.current.length - 1].style.height = '100px'
            videoFrames.current[videoFrames.current.length - 1].style.width = '100px'
        }
    }, [users.length, videoFrames.current.length])


    const expandVideoFrame = e => {

        let child = expandedFrame.current.children[0]



        if (child) {
            streamsContainer.current.appendChild(child)
        }

        expandedFrame.current.style.display = 'block'
        expandedFrame.current.appendChild(e.currentTarget)
        currentUser_inExpandedFrame = e.target.id

        for (let i = 0; videoFrames.current.length > i; i++) {
            if (videoFrames.current[i].id != currentUser_inExpandedFrame) {
                videoFrames.current[i].style.height = '100px'
                videoFrames.current[i].style.width = '100px'
            }
        }


    }

    return (
        <div>

            <div id="stream__box" ref={expandedFrame}>
                {/* <AgoraVideoPlayer videoTrack={remoteTracks[1]} style={{ height: '100%', width: '100%' }} /> */}
            </div>


            <div id="streams__container" ref={streamsContainer}>
                <div className="video__container" id={`user-container-${uid}`} onClick={expandVideoFrame} ref={el => videoFrames.current[0] = el}>
                    <AgoraVideoPlayer style={{ height: '100%', width: '100%', borderRadius: '50%' }} videoTrack={localTracks[1]} />
                </div>

                {users.length > 0 && users.map((user, index) => {
                    if (user.videoTrack) {
                        return (
                            <div className="video__container" id={`user-container-${user.uid}`} onClick={expandVideoFrame} key={user.uid + index} ref={el => videoFrames.current[index + 1] = el}>
                                <AgoraVideoPlayer
                                    videoTrack={user.videoTrack}
                                    style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                />
                            </div>
                        )
                    } else {
                        return null
                    }
                })}

            </div>
        </div>
    )
}

export default Video
