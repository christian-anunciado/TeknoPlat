import React, { useContext } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useHMSActions } from '@100mslive/react-sdk';
import SessionContext from '../../context/SessionContext';
import { toast } from 'react-toastify';

function ConfirmUnmute() {
    const { session, dispatch } = useContext(SessionContext)
    const hmsActions = useHMSActions()

    const handleUnmute = async () => {
        if (session.isConnected) {
            await hmsActions.setEnabledTrack(session.requestTrackChange.track.id, session.requestTrackChange.enabled)
            toast.success('You can now talk')
            dispatch({
                type: 'UPDATE_CHANGE_TRACK', payload: {
                    requestTrackChange: { ...session.requestTrackChange, modalState: false }
                }
            })
        }
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={session.requestTrackChange.modalState}
                onClose={() => dispatch({
                    type: 'UPDATE_CHANGE_TRACK', payload: {
                        requestTrackChange: { ...session.requestTrackChange, modalState: false }
                    }
                })}
                sx={{ padding: '2px 20px 2px 10px' }}
            >
                <ModalDialog variant="outlined" role="alertdialog" sx={{ backgroundColor: '#09090d', color: '#d8d8df' }}>
                    <Typography
                        id="alert-dialog-modal-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        Audio Unmute Request
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        The host requested to unmute your audio
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => dispatch({
                            type: 'UPDATE_CHANGE_TRACK', payload: {
                                requestTrackChange: { ...session.requestTrackChange, modalState: false }
                            }
                        })}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="#000" onClick={handleUnmute} sx={{ backgroundColor: '#fff', "&:hover": { backgroundColor: "#fff" } }}>
                            Unmute
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment >
    );
}

export default ConfirmUnmute
