import React, { useContext, useState } from 'react'
import { selectIsSomeoneScreenSharing, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';
import SessionContext from '../../context/SessionContext';
import ReactLoading from 'react-loading';
import Tabs, { tabsClasses } from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';
import SessionDetails from '../SessionDetails/SessionDetails';

function Video() {
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
    const hmsActions = useHMSActions()
    const { session } = useContext(SessionContext)
    const [index, setIndex] = useState(0);
    const [detailsModalState, setDetailsModalState] = useState(false)
    const { videoRef } = useVideo(
        {
            trackId: screenShareOn ? session.peer.auxiliaryTracks[0] : session.peer.videoTrack
        }
    )


    useEffect(() => {
        const unsub = async (e) => {
            if (screenShareOn) {
                await hmsActions.setLocalVideoEnabled(false);
            } else {
                await hmsActions.setLocalVideoEnabled(true);
            }
        }
        unsub()
    }, [screenShareOn, hmsActions])


    useEffect(() => {
        if (index === 1) {
            setDetailsModalState(true)

        }
    }, [index])

    useEffect(() => {
        if (detailsModalState === false && index === 1) {
            setIndex(0)

        }
    }, [detailsModalState])


    return (
        <div className='sessionVideo-container'>
            <SessionDetails setDetailsModalState={setDetailsModalState} detailsModalState={detailsModalState} />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', borderRadius: '10px', alignSelf: 'start', marginLeft: '50px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs
                    aria-label="Outlined tabs"
                    value={index}
                    onChange={(event, value) => setIndex(value)}
                    sx={{ borderRadius: 'lg' }}
                >
                    <TabList variant='outlined'>
                        <Tab
                            sx={{ width: '125px' }}
                            variant={index === 0 ? 'outlined' : 'plain'}
                            color={index === 0 ? 'primary' : 'neutral'}
                        >
                            Conference
                        </Tab>
                        <Tab
                            sx={{ width: '125px' }}
                            variant={index === 1 ? 'outlined' : 'plain'}
                            color={index === 1 ? 'info' : 'neutral'}
                        >
                            Details
                        </Tab>
                        <Tab
                            sx={{ width: '125px' }}
                            variant={index === 2 ? 'outlined' : 'plain'}
                            color={index === 2 ? 'warning' : 'neutral'}
                        >
                            Rate
                        </Tab>
                    </TabList>
                </Tabs>
            </Box>
            <div className="video-container">
                {!session.hostJoined && session.role === 'participant' ?
                    <div className='video-loading'>
                        <ReactLoading color='#000' type='bubbles' />
                        <h3>Waiting for host to reconnect...</h3>
                    </div> : <video className='videoPlayer'
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                    />}


            </div>
        </div>
    )
}

export default Video
