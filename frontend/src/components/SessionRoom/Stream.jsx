import React, { } from 'react'
import Chats from './Chats'
import Video from './Video'


function Stream({ role, peers }) {

    return (
        <div className='sessionStream-container'>
            <div className='sessionStream-content'>
                <Video peers={peers} />
                <Chats />
            </div>
        </div>

    )
}

export default Stream
