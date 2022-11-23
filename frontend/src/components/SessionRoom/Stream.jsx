import React, { useEffect } from 'react'
import Chats from './Chats'
import SessionNav from './SessionNav'
import Video from './Video'


function Stream({ peers, role }) {



    return (
        <div className='sessionStream-container'>
            <SessionNav />
            <div className='sessionStream-content'>
                <Video peers={peers} />
                <Chats />

            </div>
        </div>

    )
}

export default Stream