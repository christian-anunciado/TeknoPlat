import React, { useContext } from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import SessionContext from '../../context/SessionContext';

function ConfirmRatingSubmit({ roomEnded, setRoomEnded, setRatingsModalState }) {
    const { dispatch } = useContext(SessionContext)

    const handleSubmit = async () => {
        dispatch({ type: "LEAVE" })
    }

    const handleReviewRating = () => {
        setRoomEnded(false)
        setRatingsModalState(true)
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={roomEnded}
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
                        Host just ended the session!
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        How was our presentation? Your review is very important to us!
                        {<br />}
                        Note: You can still change your submitted review.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={handleReviewRating}>
                            Review Rating
                        </Button>
                        <Button variant="solid" color="danger" onClick={handleSubmit} sx={{ backgroundColor: '#a10e25', "&:hover": { backgroundColor: "#a10e25" } }}>
                            Submit and Leave Session
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default ConfirmRatingSubmit
