import React, { useContext, useState } from 'react'
import SessionContext from '../../context/SessionContext';
import ConfirmEndRoom from '../Modals/ConfirmEndRoom';
import Participants from '../Participants/Participants';
import Input from './Input'

import Messages from './Messages'

function Chats() {
    // Ari dri ang context pher
    const { session } = useContext(SessionContext)
    const [endRoom, setEndRoom] = useState(false)
    const [currentTab, setCurrentTab] = useState(1)

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
                <button className={currentTab === 1 ? 'active' : ""} onClick={() => setCurrentTab(1)}>Chats</button>
                <button className={currentTab === 2 ? 'active' : ""} onClick={() => setCurrentTab(2)} >{`Participants(${session.participants.length})`}</button>
            </div>

            {currentTab === 1 ?
                <>
                    <div className="sessionsChats-contents">
                        <Messages />
                    </div>
                    <Input />
                </> : <Participants />
            }




        </div>
    )
}

export default Chats
