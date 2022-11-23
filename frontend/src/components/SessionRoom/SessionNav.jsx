import React from 'react'

function SessionNav({ role }) {
    return (
        <div className='sessionNav-container'>
            <div className="sessionNav-controls">
                <div className="pitch-title">
                    <span>Pitch Title</span>
                </div>
                {role === 'creator' ? (
                    <div className="sessionNav-buttons">
                        <button className='askPro-button'>Ask a Pro</button>
                        <button className='uploadFiles-button'>Upload Files</button>
                        <button className='openRating-button'>Open Rating</button>
                    </div>
                ) : (null)
                }

            </div>
            {role === 'creator' ? (
                <div className="sessionNav-endSession">
                    <button>End Session</button>
                </div>) : (null)
            }
        </div>
    )
}

export default SessionNav