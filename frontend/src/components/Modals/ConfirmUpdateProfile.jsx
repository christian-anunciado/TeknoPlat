import React from 'react'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Api from '../../api/Api';
import { toast } from 'react-toastify';

function ConfirmUpdateProfile({ openProfileModalState, setOpenProfileModalState, formField, userID }) {

    const handleProceed = async () => {
        try {
            const formData = new FormData()
            formData.append('first_name', formField.firstName)
            formData.append('last_name', formField.lastName)
            formData.append('email', formField.email)
            formData.append('username', formField.username)
            formData.append('institute', formField.institute)
            await Api.put(`api/updateUser/${userID}`, formData)

            setOpenProfileModalState(false)

            toast.success("Profile updated")
        } catch (e) {
            setOpenProfileModalState(false)
            toast.error('Something went wrong')
        }
    }
    return (
        <React.Fragment>
            <Modal
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                open={openProfileModalState}
                onClose={() => setOpenProfileModalState(false)}
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
                        Confirm Update Profile?
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography
                        id="alert-dialog-modal-description"
                        mb={3}
                        fontWeight='light'
                        sx={{ color: '#d8d8df', fontWeight: 'light', lineHeight: '2' }}
                    >
                        Note: You cannot undo your changes.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="plain" color="neutral" onClick={() => setOpenProfileModalState(false)}>
                            Cancel
                        </Button>
                        <Button variant="solid" color="info" onClick={handleProceed} sx={{ backgroundColor: 'green', "&:hover": { backgroundColor: "green" } }}>
                            Update
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default ConfirmUpdateProfile
