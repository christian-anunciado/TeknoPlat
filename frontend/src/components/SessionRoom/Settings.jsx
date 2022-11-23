import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BsCameraVideo, BsPeople, BsCameraVideoOff } from 'react-icons/bs';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from 'react-icons/md';
import { ImExit } from 'react-icons/im';
import { Button } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors'

import { selectIsConnectedToRoom, selectIsSomeoneScreenSharing, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";

function Settings({ role }) {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo,
    } = useAVToggle();
    const hmsActions = useHMSActions()
    const isConnected = useHMSStore(selectIsConnectedToRoom)
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)

    const handleLeave = (e) => {
        if (isConnected) {
            hmsActions.leave()
        }
    }

    const toggleShareScreen = async (e) => {
        if (!screenShareOn)
            await hmsActions.setScreenShareEnabled(true)
        else await hmsActions.setScreenShareEnabled(false)
    }

    return (
        <div className='sessionSettings-container'>
            <div className='setting-icons topIcon'>
                {role === 'creator' ? (
                    <>
                        <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={toggleAudio}>
                            {isLocalAudioEnabled ?
                                <BiMicrophone className='button-setting' /> :
                                <BiMicrophoneOff className='button-setting' />
                            }
                        </Button>

                        <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={toggleVideo}>
                            {isLocalVideoEnabled ?
                                <BsCameraVideo className='button-setting' /> :
                                <BsCameraVideoOff className='button-setting' />
                            }

                        </Button>

                        <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={toggleShareScreen}>
                            {screenShareOn ?
                                <MdOutlineScreenShare className='button-setting' /> :
                                <MdOutlineStopScreenShare className='button-setting' />
                            }
                        </Button>
                    </>) : (

                    null
                )
                }

                <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }}>
                    <BsPeople className='button-setting' />
                </Button>

                <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }}>
                    <AiOutlineSetting className='button-setting' />
                </Button>

            </div>
            <div className="user-account">
                <Button sx={{ color: pink[700], "&:hover": { backgroundColor: "transparent" } }} onClick={handleLeave}>
                    <ImExit className='user-button' />
                </Button>
            </div>

        </div>
    )
}

export default Settings