import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './sessionRoom.scss'
import Settings from '../../components/SessionRoom/Settings'
import Stream from '../../components/SessionRoom/Stream'
import { useHMSActions } from "@100mslive/react-sdk";
import JoinSession from '../JoinSession/JoinSession'
import Loading from '../../components/Loading/Loading'
import SessionContext from '../../context/SessionContext'
import useGetPeer from '../../hooks/useGetPeer'

function SessionRoom() {
    const { session } = useContext(SessionContext)
    const loading = session.loading
    const role = session.role


    const hmsActions = useHMSActions()
    const { isConnected } = useGetPeer({ role })
    const [loadingText, setloadingText] = useState('')

    useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                hmsActions.leave();
            }
        };
    }, [hmsActions, isConnected]);

    useEffect(() => {
        const unSub = () => {
            if (role === 'creator' && session.peer === null) {
                setloadingText("We are now preparing your session...")
            }
            if (role === 'participant' && session.peer === null) {
                setloadingText("Waiting for host to enter the session...")
            }
        }

        return (
            unSub()
        )
    }, [role, session.peer])


    return (
        <div className='main-content'>
            <Navbar />
            {isConnected ?
                loading === false ? (
                    <>
                        <div className='sessionRoom'>
                            <div className="sessionRoom-container">
                                <Settings role={role} />
                                <Stream role={role} />

                            </div>
                        </div>
                    </>) : (<Loading text={loadingText} />)
                : (
                    <>
                        <JoinSession />
                    </>
                )
            }
        </div>

    )
}

export default SessionRoom