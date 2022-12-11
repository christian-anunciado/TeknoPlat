import React, { useContext, useState } from 'react'
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import SessionContext from '../../context/SessionContext';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
};

function SessionDetails({ detailsModalState, setDetailsModalState }) {
    const { session } = useContext(SessionContext)
    const [link, setLink] = useState('')

    console.log(session);

    useEffect(() => {
        if (detailsModalState) {
            setLink(`http://localhost:3000/#/session/${session.session[0].searchID}`)
        } else {
            setLink('')
        }
    }, [detailsModalState, session])
    return (
        <Modal
            open={detailsModalState}
            onClose={() => setDetailsModalState(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description">
                    <div className="rating-space">
                        <div className="rating-container">
                            <div className="items-1 item">
                                <div className="items-1-2 item rating-logo">
                                    <IconButton onClick={() => setDetailsModalState(false)} >
                                        <HighlightOffIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="items-2 items">{session.session[0].sessionName} Session Details</div>
                            <span className="rating-line"></span>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="item-session">Description</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="item-session-description">
                                            <p> {session.session[0].sessionDescription}</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session">Date</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session">Visiblity</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session">Author</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session-description">
                                            <p> {session.session[0].startsAt}</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session-description">
                                            <p>Private</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="item-session-description">
                                            <p>{session.hostName}</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="item-session">Link</div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="link"
                                            type="text"
                                            defaultValue={link}
                                            value={link}
                                            fullWidth
                                            inputProps={{ readOnly: true }}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            size="medium"
                                            sx={{
                                                width: 300
                                            }}
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                                navigator.clipboard.writeText(link)
                                                toast.success('Link Copied');
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="item-session">Code</div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="item-session">
                                            <Button
                                                size="medium"
                                                sx={{
                                                    width: 200
                                                }}
                                                variant="contained"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(session.session[0].searchID)
                                                    toast.success('Code Copied');
                                                }}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="item-session-close">
                                            <Button
                                                size="medium"
                                                sx={{
                                                    width: 200
                                                }}
                                                variant="outlined"
                                                onClick={
                                                    () => setDetailsModalState(false)
                                                }
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </Typography>
            </Box>
        </Modal>
    )
}

export default SessionDetails
