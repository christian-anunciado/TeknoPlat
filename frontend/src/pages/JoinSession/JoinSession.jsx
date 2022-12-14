import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "./JoinSessionModal.scss";
import AuthContext from '../../context/AuthContext'
import { useHMSActions } from '@100mslive/react-sdk'
import SessionContext from '../../context/SessionContext'
import Api from '../../api/Api'


function JoinSession() {
    // Context
    const { user } = useContext(AuthContext)
    const { dispatch } = useContext(SessionContext)


    // Local Variables
    const [role, setRole] = useState('')
    const [api, setApi] = useState([])
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [password, setPassword] = useState("")
    const hmsActions = useHMSActions();
    const { id } = useParams();

    // Hooks

    useEffect(() => {
        const fetchApi = async () => {
            const response = await Api.get(`api/joinsession/${id}`)
            const data = await response.data
            setApi(data)

        }
        fetchApi()
    }, [])



    useEffect(() => {
        const unsub = () => {
            if (api.length > 0) {
                api[0].creator === user.userID ? setRole('creator') : setRole('participant')
            }
        }

        return (
            unsub()
        )
    }, [api.length])



    const handleJoinButton = (e) => {
        e.preventDefault()

        setPasswordStatus(true)

    }

    const joinRoom = async () => {
        const capitalizedName =
            user.first_name.charAt(0).toUpperCase()
            + user.first_name.slice(1)
        try {
            const req = await Api.post('api/generateAppToken', {
                "room_id": api[0].sessionID,
                "role": role,
                "user_id": capitalizedName
            })
            if (req) {
                await hmsActions.join({
                    userName: capitalizedName,
                    authToken: req.data
                });

                dispatch({
                    type: "UPDATE_SESSION",
                    payload: {
                        session: api
                    }
                })

                dispatch({
                    type: "UPDATE_ROLE",
                    payload: {
                        role: role
                    }
                })
            }
        } catch (err) {
            alert(err)
        }
    }


    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password === api[0].sessionPassword) {
            joinRoom()
        } else {
            alert("Incorrect Password!")
        }

    }

    return (
        <div>
            <Link to={`/search_session`} ><button>Go back</button></Link>
            {
                api.map((apis) => {
                    return <div key={apis.id}>
                        <h1 >{apis.sessionName}</h1>
                        <p >{apis.sessionDescription}</p>
                        <p >{apis.creator}</p>
                        <button onClick={handleJoinButton}>Join</button>
                        <Link to={`/sessionLobby/${apis.searchID}`} ><button disabled>Leave</button></Link>
                        <br /><br />
                        {passwordStatus &&
                            <>
                                <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <button onClick={handlePasswordSubmit}>Submit</button>
                            </>
                        }
                    </div>
                })
            }
        </div >
    )
}

export default JoinSession
