import React from 'react'

function SessionNav() {
    return (
        <div className='sessionNav-container'>
            <div className="sessionNav-controls">
                <div className="pitch-title">
                    <span>Pitch Title</span>
                </div>

                <div className="sessionNav-buttons">
                    <button className='askPro-button'>Ask a Pro</button>
                    <button className='uploadFiles-button'>Upload Files</button>
                    <button className='openRating-button'>Open Rating</button>
                </div>
            </div>

            <div className="sessionNav-endSession">
                <button>End Session</button>
            </div>
        </div>
    )
}

export default SessionNav