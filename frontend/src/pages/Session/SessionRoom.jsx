import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './sessionRoom.scss'
import Settings from '../../components/SessionRoom/Settings'
import Stream from '../../components/SessionRoom/Stream'
import { selectIsConnectedToRoom, selectPeers, selectRemotePeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import JoinForm from './JoinForm';

function SessionRoom() {
    const [role, setRole] = useState("creator")
    const [peer, setPeer] = useState([])
    const localPeer = useHMSStore(selectPeers);
    const remotePeer = useHMSStore(selectRemotePeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    console.log("Local Peer: ", localPeer);
    console.log("Remote Peer: ", remotePeer);


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
                        <Settings role={role} />
                        <Stream peers={role === 'creator' ? localPeer : remotePeer} role={role} />

                    </div>
                </div>
            ) : (
                <JoinForm setRole={setRole} role={role} />
            )
            }
        </div>

    )
}

export default SessionRoom