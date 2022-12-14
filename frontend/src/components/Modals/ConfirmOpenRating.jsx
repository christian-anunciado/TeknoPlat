import React, { useContext } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { selectLocalPeerID, selectPeerMetadata, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import SessionContext from '../../context/SessionContext';
import { toast } from 'react-toastify';
import Api from '../../api/Api';

function ConfirmOpenRating({ openRatingModalState, setOpenRatingModalState }) {
    const { session, dispatch } = useContext(SessionContext)
    const hmsActions = useHMSActions()
    const localPeerId = useHMSStore(selectLocalPeerID);
    const metaData = useHMSStore(selectPeerMetadata(localPeerId));

    const handleProceed = async () => {
        try {
            const newMetadata = { ...metaData, openRating: true };
            await hmsActions.changeMetadata(newMetadata);

            const formField = new FormData()
            formField.append('ratingOpen', 1)
            await Api.put(`api/updateSession/${session.session[0].id}`, formField)

            dispatch({ type: 'UPDATE_RATING', payload: { isRatingOpen: true } })

            setOpenRatingModalState(false)

            toast.success("Participants can now rate your session")
        } catch (e) {
            toast.error('Something went wrong')
        }
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={openRatingModalState}
                onClose={() => setOpenRatingModalState(false)}
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
                        Confirm opening rating?
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        Opens rating for everyone
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => setOpenRatingModalState(false)}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="info" onClick={handleProceed} sx={{ backgroundColor: '#054da7', "&:hover": { backgroundColor: "#054da7" } }}>
                            Proceed
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default ConfirmOpenRating
