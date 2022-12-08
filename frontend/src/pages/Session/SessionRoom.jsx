import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './sessionRoom.scss'
import Settings from '../../components/SessionRoom/Settings'
import Stream from '../../components/SessionRoom/Stream'
import { selectIsConnectedToRoom, selectLocalPeer, selectRemotePeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import JoinSession from '../JoinSession/JoinSession'
import Loading from '../../components/Loading/Loading'

function SessionRoom() {
    const [role, setRole] = useState("creator")
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const [loading, setLoading] = useState(true)
    const [peers, setPeers] = useState([])
    const localPeer = useHMSStore(selectLocalPeer)
    const remotePeer = useHMSStore(selectRemotePeers)

    useEffect(() => {
        if (isConnected) {
            if (role === 'creator') {
                const length = Object.keys(localPeer).length
                if (length > 0) {
                    if (localPeer.videoTrack) {
                        setPeers(localPeer)
                        setLoading(false)
                    }
                }
            }

            if (role === 'participant') {
                const length = Object.keys(remotePeer).length
                if (length > 0) {
                    setPeers(remotePeer[0])
                    setLoading(false)
                }
            }
        }
    }, [localPeer, remotePeer, isConnected])

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
            {isConnected ?
                loading === false ? (
                    <>

                        <div className='sessionRoom'>
                            <div className="sessionRoom-container">
                                <Settings role={role} />
                                <Stream peers={peers} role={role} />

                            </div>
                        </div>
                    </>) : (<Loading />)
                : (
                    <>
                        <JoinSession setRole={setRole} role={role} />
                    </>
                )
            }
        </div>

    )
}

export default SessionRoom