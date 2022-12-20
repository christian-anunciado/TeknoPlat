import { Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React, { useState } from 'react'
import ReactLoading from 'react-loading';
import RatingDetails from '../Rating/RatingDetails';

function PitchHistory({ selectedPitch, search, setSearch }) {
    const [ratingsModalState, setRatingsModalState] = useState(false)


    const handleOpenRatingModal = (e) => {
        e.preventDefault()
        setRatingsModalState(true)
    }
    return (
        <>
            {ratingsModalState &&
                <RatingDetails ratingsModalState={ratingsModalState} setRatingsModalState={setRatingsModalState} selectedPitch={selectedPitch} />}
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 1,
                        p: 2,
                        width: "95%",
                        height: "100%",
                    },
                    maxHeight: { xs: 0, md: 890 },
                    // height: 890,
                    // overflow: "hidden",
                    // overflowY: "scroll",
                }}
                InputLabelProps={{ shrink: true }}
            >
                <Paper elevation={3}
                    sx={!selectedPitch ? { height: "100%", width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' } : null}
                >

                    {selectedPitch
                        ? <>
                            <Grid container spacing={2}>
                                <Grid item xs={12}></Grid>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    direction="column"
                                    justifyContent="space-evenly"
                                    alignItems="stretch"
                                >
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={6}
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-end"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h4"
                                                component="div"
                                            >
                                                Pitch Session History
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label="Search Pitch"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-end"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                                sx={{
                                                    fontSize: '1.9rem',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {selectedPitch.sessionName.toUpperCase()}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <IconButton onClick={handleOpenRatingModal}>
                                                <StarHalfIcon />
                                                <StarHalfIcon />
                                                <StarHalfIcon />
                                                <StarHalfIcon />
                                                <StarHalfIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                sx={{
                                                    mb: 2,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    flexWrap: "wrap",
                                                    width: "100%",
                                                    height: "100%",
                                                    maxHeight: '200px',
                                                    p: 1,
                                                    border: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    {selectedPitch.sessionDescription}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                        : <>
                            <ReactLoading color='#000' type='spinningBubbles' />
                            <h3>Fetching your sessions...</h3>
                        </>
                    }
                </Paper>

            </Box >
        </>
    )
}

export default PitchHistory
