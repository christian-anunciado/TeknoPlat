import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useVideo } from "@100mslive/react-sdk";


function Video({ peers }) {
    console.log(peers);
    const { videoRef } = useVideo({
        trackId: peers[0].videoTrack
    });

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