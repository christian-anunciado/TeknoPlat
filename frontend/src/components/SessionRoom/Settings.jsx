import React, { useCallback } from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BsCameraVideo, BsPeople, BsCameraVideoOff } from 'react-icons/bs';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { MdOutlineScreenShare, MdOutlineStopScreenShare, MdOutlineFrontHand, MdOutlineWavingHand } from 'react-icons/md';

import { ImExit } from 'react-icons/im';
import { Button } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors'

import { selectIsConnectedToRoom, selectIsSomeoneScreenSharing, selectLocalPeerID, selectPeerMetadata, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { useContext } from 'react';
import SessionContext from '../../context/SessionContext';

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
    const { dispatch } = useContext(SessionContext)
    const localPeerId = useHMSStore(selectLocalPeerID);
    const metaData = useHMSStore(selectPeerMetadata(localPeerId));


    const handleLeave = (e) => {
        if (isConnected) {
            dispatch({ type: "LEAVE" })
            hmsActions.leave()
        }
    }

    const toggleShareScreen = async (e) => {
        if (!screenShareOn)
            await hmsActions.setScreenShareEnabled(true)
        else await hmsActions.setScreenShareEnabled(false)
    }

    const toggleRaiseHand = useCallback(async () => {
        const newMetadata = { ...metaData, isHandRaised: !metaData.isHandRaised };
        await hmsActions.changeMetadata(newMetadata);
    }, [hmsActions, metaData]);

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
                    </>) : (<Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={toggleRaiseHand}>
                        {metaData.isHandRaised ?
                            <MdOutlineWavingHand className='button-setting active' /> :
                            <MdOutlineFrontHand className='button-setting' />
                        }
                    </Button>)
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
