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

function ConfirmLeaveSession({ leaveSessionModal, setLeaveSessionModal }) {
    const { session, dispatch } = useContext(SessionContext)
    const hmsActions = useHMSActions()

    const handleLeaveSession = () => {
        if (session.isConnected) {
            toast.info('You just left the session')
            dispatch({ type: "LEAVE" })
            hmsActions.leave()
        }
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={leaveSessionModal}
                onClose={() => setLeaveSessionModal(false)}
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
                        Are you sure you want to leave the session?
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        Note: If the session has not yet ended, you can rejoin it at any time.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => setLeaveSessionModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleLeaveSession} sx={{ backgroundColor: '#a10e25', "&:hover": { backgroundColor: "#a10e25" } }}>
                            Leave Session
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default ConfirmLeaveSession
