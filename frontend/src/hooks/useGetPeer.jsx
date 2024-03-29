import { selectIsConnectedToRoom, selectLocalPeer, selectPeers, selectPeersByRole, useHMSStore } from '@100mslive/react-sdk';
import { useContext, useEffect } from 'react'
import SessionContext from '../context/SessionContext';

function useGetPeer({ role }) {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const participants = useHMSStore(selectPeers)
    const localPeer = useHMSStore(selectLocalPeer)
    const remotePeer = useHMSStore(selectPeersByRole('creator'))
    const { dispatch } = useContext(SessionContext)

    useEffect(() => {
        if (isConnected) {
            if (role === 'creator') {
                const length = Object.keys(localPeer).length
                if (length > 0) {
                    if (localPeer.videoTrack) {
                        dispatch({
                            type: 'UPDATE_SESSION_STATUS', payload: {
                                role: role,
                                peer: localPeer,
                                loading: false,
                                isConnected: isConnected,
                                hostJoined: true
                            }
                        })
                    }
                }
            }

            if (role === 'participant') {
                const length = Object.keys(remotePeer).length
                if (length > 0) {
                    dispatch({
                        type: 'UPDATE_SESSION_STATUS', payload: {
                            role: role,
                            peer: remotePeer[0],
                            loading: false,
                            isConnected: isConnected,
                            hostJoined: true
                        }
                    })
                }
                if (length === 0) {
                    dispatch({
                        type: 'UPDATE_HOSTJOINED', payload: {
                            hostJoined: false
                        }
                    })
                }
            }

            if (participants) {
                dispatch({
                    type: 'UPDATE_PARTICIPANTS', payload: {
                        participants: participants
                    }
                })
            }

        }
    }, [localPeer, remotePeer, isConnected, role, participants])

    return {
        isConnected
    }


}

export default useGetPeer
