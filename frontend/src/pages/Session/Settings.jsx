import React from 'react'
import { AiOutlineHome, AiOutlineVideoCamera, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { BsCameraVideo, BsListCheck, BsPeople, BsCameraVideoOff } from 'react-icons/bs';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { TbScreenShare, TbScreenShareOff } from 'react-icons/tb';
import { ImExit } from 'react-icons/im';
import { Button } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors'

import { selectIsConnectedToRoom, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";

function Settings() {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
    } = useAVToggle();
    const hmsActions = useHMSActions()
    const isConnected = useHMSStore(selectIsConnectedToRoom)

    const handleClick = (e) => {
        if (isConnected) {
            hmsActions.leave()
        }
    }

    return (
        <div className='sessionSettings-container'>
            <div className='setting-icons topIcon'>

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

                <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }}>
                    <TbScreenShare className='button-setting' />
                </Button>

                <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }}>
                    <BsPeople className='button-setting' />
                </Button>

                <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }}>
                    <AiOutlineSetting className='button-setting' />
                </Button>

            </div>
            <div className="user-account">
                <Button sx={{ color: pink[700], "&:hover": { backgroundColor: "transparent" } }} onClick={handleClick}>
                    <ImExit className='user-button' />
                </Button>
            </div>

        </div>
    )
}

export default Settings