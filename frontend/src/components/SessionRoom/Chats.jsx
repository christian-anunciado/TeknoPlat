import React, { useContext, useState } from 'react'
import SessionContext from '../../context/SessionContext';
import ConfirmEndRoom from '../Modals/ConfirmEndRoom';
import Input from './Input'

import Messages from './Messages'

function Chats() {
    // Ari dri ang context pher
    const { session } = useContext(SessionContext)
    const [endRoom, setEndRoom] = useState(false)

    const handleEndRoom = async () => {
        setEndRoom(true)
    };
    return (
        <div className='sessionChats-container'>

            {session.role === 'creator' ? (
                <>
                    <ConfirmEndRoom endRoom={endRoom} setEndRoom={setEndRoom} />
                    <div className="sessionNav-endSession">
                        <button onClick={handleEndRoom}>End Session</button>
                    </div>
                </>
            )
                : (null)
            }
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
