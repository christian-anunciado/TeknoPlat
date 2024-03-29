import React, { useCallback, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BsCameraVideo, BsPeople, BsCameraVideoOff } from 'react-icons/bs';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { MdOutlineScreenShare, MdOutlineStopScreenShare, MdOutlineFrontHand, MdOutlineWavingHand } from 'react-icons/md';

import { ImExit } from 'react-icons/im';
import { Button } from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors'

import { selectIsSomeoneScreenSharing, selectLocalPeerID, selectPeerMetadata, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import ConfirmLeaveSession from '../Modals/ConfirmLeaveSession';

function Settings({ role }) {
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo,
    } = useAVToggle();
    const hmsActions = useHMSActions()
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)

    const localPeerId = useHMSStore(selectLocalPeerID);
    const metaData = useHMSStore(selectPeerMetadata(localPeerId));
    const [leaveSessionModal, setLeaveSessionModal] = useState(false)


    const handleLeave = (e) => {
        setLeaveSessionModal(true)
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

    const participantAudio = () => {
        toggleRaiseHand()
        toggleAudio()
    }

    return (
        <div className='sessionSettings-container'>
            <ConfirmLeaveSession leaveSessionModal={leaveSessionModal} setLeaveSessionModal={setLeaveSessionModal} />
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
                    <>
                        {isLocalAudioEnabled ?
                            <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={participantAudio}>
                                {isLocalAudioEnabled ?
                                    <BiMicrophone className='button-setting' /> :
                                    <BiMicrophoneOff className='button-setting' />
                                }
                            </Button> :
                            <Button sx={{ color: blueGrey[900], "&:hover": { backgroundColor: "transparent" } }} onClick={toggleRaiseHand}>
                                {metaData.isHandRaised ?
                                    <MdOutlineWavingHand className='button-setting active' /> :
                                    <MdOutlineFrontHand className='button-setting' />
                                }
                            </Button>
                        }
                    </>
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
        </div >
    )
}

export default Settings
