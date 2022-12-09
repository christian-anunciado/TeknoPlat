import { selectIsConnectedToRoom, selectLocalPeer, selectRemotePeers, useHMSStore } from '@100mslive/react-sdk';
import { useContext, useEffect } from 'react'
import SessionContext from '../context/SessionContext';

function useGetPeer({ role }) {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const localPeer = useHMSStore(selectLocalPeer)
    const remotePeer = useHMSStore(selectRemotePeers)
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
                                isConnected: isConnected
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
                            isConnected: isConnected
                        }
                    })
                }
            }

        }

        if (!isConnected && Object.keys(remotePeer).length == 0) {
            dispatch({
                type: "LEAVE"
            })
        }
    }, [localPeer, remotePeer, isConnected, role])

    return {
        isConnected
    }


}

export default useGetPeer