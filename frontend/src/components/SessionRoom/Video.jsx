import React, { useContext } from 'react'
import { selectIsSomeoneScreenSharing, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';
import SessionContext from '../../context/SessionContext';


function Video() {
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
    const hmsActions = useHMSActions()
    const { session } = useContext(SessionContext)

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


    return (
        <div className='sessionVideo-container'>
            <div className="videoFunctions-container">
                <button className='active'>Conference</button>
                <button>Details</button>
                <button>Rate</button>
            </div>
            <div className="video-container">
                <video className='videoPlayer'
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                />

            </div>
        </div>
    )
}

export default Video