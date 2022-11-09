import React from 'react'
import Navbar from '../../components/Mod6/Navbar'
import './mod6-main.scss'
import './sessionLobby.scss'
import Settings from '../../components/Mod6/Settings'
import Stream from '../../components/Mod6/Stream'
import Chats from '../../components/Mod6/Chats'

const SessionsLobby = () => {
    return (
        <div>
            <Navbar />
            <main className='container'>
                <div id="room__container">
                    <Settings />
                    <Stream />
                    <Chats />
                </div>
            </main>
        </div>
    )
}

export default SessionsLobby