import React, { useContext } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useHMSActions } from '@100mslive/react-sdk';
import SessionContext from '../../context/SessionContext';

function ConfirmEndRoom({ endRoom, setEndRoom }) {
    const hmsActions = useHMSActions();
    const { dispatch } = useContext(SessionContext)

    const handleEndRoom = async () => {
        try {
            const lock = false; // set to true to disallow rejoins
            const reason = 'Host ended the session';
            await hmsActions.endRoom(lock, reason);
            dispatch({ type: "LEAVE" })
        } catch (error) {
            // Permission denied or not connected to room
            console.error(error);
        }
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={endRoom}
                onClose={() => setEndRoom(false)}
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
                        That's a wrap!
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        Done with your pitch presentation? Let's end the session.
                        {<br />}
                        Note: Participants can't join if you end the session.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => setEndRoom(false)}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleEndRoom} sx={{ backgroundColor: '#a10e25', "&:hover": { backgroundColor: "#a10e25" } }}>
                            End Session
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default ConfirmEndRoom
