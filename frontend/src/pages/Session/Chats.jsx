import React from 'react'
import Input from './Input'

import Messages from './Messages'

function Chats() {
    return (
        <div className='sessionChats-container'>
            <div className="sessionChats-controls">
                <button className='active'>Chats</button>
                <button>Participants</button>
            </div>

            <div className="sessionsChats-contents">
                <Messages />
            </div>

            <Input />



        </div>
    )
}

export default Chats