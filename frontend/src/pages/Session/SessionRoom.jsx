import React, { useEffect } from 'react'
import Chats from './Chats'
import Navbar from '../../components/Navbar/Navbar'
import './session.scss'
import Settings from './Settings'
import Stream from './Stream'
import { selectIsConnectedToRoom, selectPeers, selectRemotePeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import JoinForm from './JoinForm';

function SessionRoom() {
    const peers = useHMSStore(selectRemotePeers);
    const peers1 = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const filteredPeers = [...peers].filter(peer => peer.name != peers[0].name)
    console.log(peers1);



    useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);
    return (
        <body>
            {isConnected ? (
                <div className='main-content'>
                    <Navbar />
                    <div className='session'>
                        <div className="session-container">
                            <Settings />
                            <Stream peers={peers1} />

                        </div>
                    </div>
                </div>
            ) : (
                <JoinForm />
            )
            }
        </body>
    )
}

export default SessionRoom