import React, { useEffect, useState } from 'react'
import Chats from './Chats'
import Navbar from '../../components/Navbar/Navbar'
import './sessionRoom.scss'
import Settings from './Settings'
import Stream from './Stream'
import { selectIsConnectedToRoom, selectIsSomeoneScreenSharing, selectPeers, selectPeerScreenSharing, selectRemotePeers, useHMSActions, useHMSStatsStore, useHMSStore } from "@100mslive/react-sdk";
import JoinForm from './JoinForm';

function SessionRoom() {
    const [peer, setPeer] = useState(null)
    const peers = useHMSStore(selectPeers);
    const presentor = useHMSStore(selectPeerScreenSharing);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
  


    useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);


    return (
                <div className='main-content'>
                    <Navbar />
                    {isConnected ? (
                    <div className='sessionRoom'>
                        <div className="sessionRoom-container">
                            <Settings />
                            <Stream peers={peers} />

                        </div>
                    </div>
                    ) : (
                        <JoinForm />
                    )
                    }
                </div>
            
    )
}

export default SessionRoom