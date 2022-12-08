import React, { } from 'react'
import Chats from './Chats'
import SessionNav from './SessionNav'
import Video from './Video'


function Stream({ role, peers }) {

    return (
        <div className='sessionStream-container'>
            <SessionNav role={role} />
            <div className='sessionStream-content'>
                <Video peers={peers} />
                <Chats />

            </div>
        </div>

    )
}

export default Stream
