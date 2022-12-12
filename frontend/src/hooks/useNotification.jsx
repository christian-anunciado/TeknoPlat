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
    const { session } = useContext(SessionContext)


    useEffect(() => {
        if (!notification) {
            return;
        }
        const unsub = () => {

            console.log('notification type', notification.type);
            console.log('data', notification.data);
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
                    break;

                case 'TRACK_DEGRADED':
                    toast.warning('Slow Internet Connection')
                    break;

                case 'TRACK_RESTORED':
                    toast.success('Internet restored')

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
