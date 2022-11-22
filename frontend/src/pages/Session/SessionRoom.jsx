import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './sessionRoom.scss'
import Settings from '../../components/SessionRoom/Settings'
import Stream from '../../components/SessionRoom/Stream'
import { selectIsConnectedToRoom, selectPeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import JoinForm from './JoinForm';

function SessionRoom() {
    const [peer, setPeer] = useState(null)
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();



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