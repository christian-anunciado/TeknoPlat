import { selectPeerMetadata, useHMSNotifications, useHMSStore } from '@100mslive/react-sdk'
import { useContext, useEffect, useRef } from 'react'
import { toast } from 'react-toastify';
import SessionContext from '../context/SessionContext';
import { ImExit } from 'react-icons/im';

function useNotification() {
    const notification = useHMSNotifications()
    const raisedHandNotif = useHMSNotifications('METADATA_UPDATED')
    const peer = raisedHandNotif?.data
    const raisedHand = useRef([])
    const isHandRaised = useHMSStore(selectPeerMetadata(peer?.id ?? ""))?.isHandRaised
    const isRatingOpened = useHMSStore(selectPeerMetadata(peer?.id ?? ""))?.openRating
    const { session, dispatch } = useContext(SessionContext)


    useEffect(() => {
        if (!notification) {
            return;
        }
        const unsub = () => {

            switch (notification.type) {
                case 'PEER_JOINED':
                    if (session.role === 'creator')
                        toast.success(`${notification.data.name} has joined the room`);
                    if (session.role === 'participant' && notification.data.roleName === 'creator')
                        toast.success(`${notification.data.name}(Host) has joined the session`);
                    break;
                case 'PEER_LEFT':
                    if (session.role === 'creator')
                        toast.error(`${notification.data.name} has left the room`, {
                            icon: ({ theme, type }) => <ImExit color={type} />
                        });
                    if (session.role === 'participant' && notification.data.roleName === 'creator')
                        toast.error(`The host has been disconnected`, {
                            icon: ({ theme, type }) => <ImExit />
                        }
                        );
                    break;
                case 'METADATA_UPDATED':
                    if (isHandRaised && peer && !peer.isLocal) {
                        raisedHand.current.push({
                            toastID: toast(`${peer.name} raised their hand.`, {
                                autoClose: false,
                                hideProgressBar: false,
                                icon: '✋',
                                toastID: peer.id

                            }),
                            toastCreator: peer.id
                        })

                    }

                    if (!isHandRaised && peer) {
                        const index = raisedHand.current.findIndex(obj => obj.toastCreator === peer.id)
                        if (index != -1) {
                            toast.dismiss(raisedHand.current[index].toastID.toString())
                            raisedHand.current = raisedHand.current.filter((item) => item.toastCreator !== peer.id)
                        }

                    }

                    if (isRatingOpened && peer && !peer.isLocal) {
                        toast.info("Rating is now open")
                        dispatch({
                            type: 'UPDATE_RATING', payload: {
                                isRatingOpen: true
                            }
                        })
                    }
                    break;

                case 'TRACK_DEGRADED':
                    toast.warning('Slow Internet Connection')
                    break;

                default:
                    break;
            }
        }
        return (
            unsub()
        )
    }, [notification, isHandRaised, peer])

}

export default useNotification
