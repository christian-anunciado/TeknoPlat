import React from 'react'
import { selectIsSomeoneScreenSharing, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';


function Video({ peers }) {
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
    const hmsActions = useHMSActions()

    const { videoRef } = useVideo(
        {
            trackId: screenShareOn ? peers.auxiliaryTracks[0] : peers.videoTrack
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