import React, { useState } from 'react'
import { Button } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import LogoutIcon from '@mui/icons-material/Logout';
import { createScreenShare, useClient } from '../../assets/js/Mod6/settings';
import { createScreenVideoTrack } from 'agora-rtc-react';

function Controls(props) {
    const client = useClient()
    const { setLocalTrack, localTracks, setStart, setInCall } = props
    const [trackState, setTrackState] = useState({ video: true, audio: true, shareScreen: false })
    const [sharingScreen, setSharingScreen] = useState(false)



    const leaveSession = async () => {
        const closeTab = () => {
            window.close(``, `_parent`, ``);
        };
        await client.leave()
        client.removeAllListeners()
        localTracks[0].close()
        localTracks[1].close()
        setStart(false)
        setInCall(false)
        closeTab()
    }

    const mute = async (track) => {
        console.log(localTracks);
        if (track === "video") {
            await localTracks[1].setEnabled(!trackState.video)
            setTrackState((prev) => ({ ...prev, video: !prev.video }))

        }

        if (track === "audio") {
            await localTracks[0].setEnabled(!trackState.audio)
            setTrackState((prev) => ({ ...prev, audio: !prev.audio }))
        }

        if (track === "shareScreen") {
            if (sharingScreen === false) {
                setSharingScreen(true)
                setTrackState((prev) => ({ ...prev, shareScreen: !prev.shareScreen }))
            } else {
                setSharingScreen(false)
                setTrackState((prev) => ({ ...prev, shareScreen: !prev.shareScreen }))

            }
        }
    }



    return (
        <div className="stream__actions">
            <Button
                // className= {'active'}
                className={trackState.video ? "active" : "disabled"}
                variant='contained'
                // color={trackState.video ? "#262625" : "#845695"}
                onClick={() => mute("video")}
            >
                {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
            </Button>

            <Button
                className={trackState.audio ? "active" : "disabled"}
                variant='contained'
                // color={trackState.audio ? "#262625" : "#845695"}
                onClick={() => mute("audio")}
            >
                {trackState.audio ? <MicIcon /> : <MicOffIcon />}
            </Button>

            <Button
                className={trackState.shareScreen ? "active" : "disabled"}
                variant='contained'
                // color={trackState.shareScreen ? "#262625" : "#845695"}
                onClick={() => mute("shareScreen")}
            >
                {trackState.shareScreen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
            </Button>

            <Button
                className='leave-button '
                variant='contained'
                // color={"#FF5050"}
                onClick={() => leaveSession()}
            >
                {<LogoutIcon />}
            </Button>
        </div>
    )
}

export default Controls