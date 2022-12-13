import React, { useContext, useState } from 'react'
import { HMSNotificationTypes, selectIsSomeoneScreenSharing, useHMSActions, useHMSNotifications, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';
import SessionContext from '../../context/SessionContext';
import ReactLoading from 'react-loading';
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

            <div className="videoFunctions-container">
                <button className={index === 0 ? 'active' : ""} onClick={() => setIndex(0)}>Discussion</button>
                <button className={index === 1 ? 'active' : ""} onClick={() => setIndex(1)} >Session Details</button>
                {session.role === 'participant' ? <button className={index === 2 ? 'active' : ""} onClick={() => setIndex(2)} disabled={session.isRatingOpen ? false : true} >Rate</button> : null}

            </div>

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
