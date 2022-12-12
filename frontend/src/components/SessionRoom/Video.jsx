import React, { useContext, useState } from 'react'
import { HMSNotificationTypes, selectIsSomeoneScreenSharing, useHMSActions, useHMSNotifications, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';
import SessionContext from '../../context/SessionContext';
import ReactLoading from 'react-loading';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';
import SessionDetails from '../SessionDetails/SessionDetails';
import RatingSession from '../../pages/Rating/RatingSession';
import RatingDetails from '../../pages/Rating/RatingDetails';
import ConfirmRatingSubmit from '../Modals/ConfirmRatingSubmit';
import ConfirmOpenRating from '../Modals/ConfirmOpenRating';

function Video() {
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
    const hmsActions = useHMSActions()
    const roomEndedNotif = useHMSNotifications(HMSNotificationTypes.ROOM_ENDED)
    const { session } = useContext(SessionContext)
    const [index, setIndex] = useState(0);
    const [detailsModalState, setDetailsModalState] = useState(false)
    const [ratingsModalState, setRatingsModalState] = useState(false)
    const [openRatingModalState, setOpenRatingModalState] = useState(false)
    const [roomEnded, setRoomEnded] = useState(false)

    const { videoRef } = useVideo(
        {
            trackId: screenShareOn ? session.peer.auxiliaryTracks[0] : session.peer.videoTrack
        }
    )

    useEffect(() => {
        const unsub = async (e) => {
            if (screenShareOn) {
                await hmsActions.setLocalVideoEnabled(false);
            } else {
                await hmsActions.setLocalVideoEnabled(true);
            }
        }
        unsub()
    }, [screenShareOn, hmsActions])


    useEffect(() => {
        if (index === 1) {
            setDetailsModalState(true)
        }
        if (index === 2) {
            setRatingsModalState(true)
        }
    }, [index])

    useEffect(() => {
        if (detailsModalState === false && index === 1) {
            setIndex(0)
        }
        if (ratingsModalState === false && index === 2) {
            setIndex(0)
        }
    }, [detailsModalState, ratingsModalState])

    useEffect(() => {
        if (session.role === 'participant' && roomEndedNotif) {
            setRoomEnded(true)
        }
    }, [roomEndedNotif])

    const handleOpenRating = () => {
        setOpenRatingModalState(true)
    }


    return (
        <div className='sessionVideo-container'>

            <SessionDetails setDetailsModalState={setDetailsModalState} detailsModalState={detailsModalState} />
            {session.role === 'creator'
                ? <>
                    <RatingDetails setRatingsModalState={setRatingsModalState} ratingsModalState={ratingsModalState} />
                    <ConfirmOpenRating openRatingModalState={openRatingModalState} setOpenRatingModalState={setOpenRatingModalState} />
                </>
                : <>
                    <RatingSession setRatingsModalState={setRatingsModalState} ratingsModalState={ratingsModalState} />
                    <ConfirmRatingSubmit roomEnded={roomEnded} setRoomEnded={setRoomEnded} />
                </>

            }

            <div className='sessionNav-container'>
                <div className="sessionNav-controls">
                    <div className="pitch-title">
                        <h2>{session.session[0].sessionName}</h2>
                    </div>
                    {session.role === 'creator' ? (
                        <div className="sessionNav-buttons">
                            <button className='askPro-button'>Ask a Pro</button>
                            <button className='uploadFiles-button'>Upload Files</button>
                            {session.isRatingOpen ? <button className='openRating-button' disabled>Rating is opened</button> : <button className='openRating-button' onClick={handleOpenRating}>Open Rating</button>}

                        </div>
                    ) : (null)
                    }
                </div>
            </div>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', borderRadius: '10px', alignSelf: 'start', marginLeft: '50px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs
                    aria-label="Outlined tabs"
                    value={index}
                    onChange={(event, value) => setIndex(value)}
                    sx={{ borderRadius: 'lg' }}
                >
                    <TabList variant='outlined'>
                        <Tab
                            sx={{ width: '125px' }}
                            variant={index === 0 ? 'outlined' : 'plain'}
                            color={index === 0 ? 'primary' : 'neutral'}
                        >
                            Conference
                        </Tab>
                        <Tab
                            sx={{ width: '125px' }}
                            variant={index === 1 ? 'outlined' : 'plain'}
                            color={index === 1 ? 'info' : 'neutral'}
                        >
                            Details
                        </Tab>
                        {session.isRatingOpen ? <Tab
                            sx={{ width: '125px' }}
                            variant={index === 2 ? 'outlined' : 'plain'}
                            color={index === 2 ? 'warning' : 'neutral'}
                        > {session.role === 'creator' ? 'Rate Details' : 'Rate'}
                        </Tab> : <Tab
                            sx={{ width: '125px' }}
                            variant={index === 2 ? 'outlined' : 'plain'}
                            color={index === 2 ? 'warning' : 'neutral'}
                            disabled
                        > {session.role === 'creator' ? 'Rate Details' : 'Rate'}
                        </Tab>}
                    </TabList>
                </Tabs>
            </Box>
            <div className="video-container">
                {!session.hostJoined && session.role === 'participant' ?
                    <div className='video-loading'>
                        <ReactLoading color='#000' type='bubbles' />
                        <h3>Waiting for host to reconnect...</h3>
                    </div> : <video className='videoPlayer'
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                    />}


            </div>
        </div>
    )
}

export default Video
