import React, { useContext } from 'react'
import { selectIsSomeoneScreenSharing, useHMSActions, useHMSStore, useVideo } from "@100mslive/react-sdk";
import { useEffect } from 'react';
import SessionContext from '../../context/SessionContext';
import ReactLoading from 'react-loading';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';


function Video() {
    const screenShareOn = useHMSStore(selectIsSomeoneScreenSharing)
    const hmsActions = useHMSActions()
    const { session } = useContext(SessionContext)
    console.log(session, screenShareOn);
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


    return (
        <div className='sessionVideo-container'>
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
                <TabList>
                    <Tab>First tab</Tab>
                    <Tab>Second tab</Tab>
                    <Tab>Third tab</Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 2 }}>
                    <b>First</b> tab panel
                </TabPanel>
                <TabPanel value={1} sx={{ p: 2 }}>
                    <b>Second</b> tab panel
                </TabPanel>
                <TabPanel value={2} sx={{ p: 2 }}>
                    <b>Third</b> tab panel
                </TabPanel>
            </Tabs>
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
