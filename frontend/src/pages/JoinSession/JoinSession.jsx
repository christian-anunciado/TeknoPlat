import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'


function JoinSession(props) {
    const [api, setApi] = useState([])
    const [passwordStatus, setPasswordStatus] = useState(false)
    const [password, setPassword] = useState("")
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/joinsession/${id}`)
        const data = await response.data
        setApi(data)
    }

    const handleJoin = (e) => {
        e.preventDefault()

        setPasswordStatus(true)

    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password === api[0].sessionPassword) {
            navigate(`/sessionLobby/room?${id}`)
        } else {
            alert("Incorrect Password!")
        }

    }

    return (
        <div>
            <Navbar />
            <Link to={`/session`} ><button>Go back</button></Link>
            {
                api.map((apis) => {
                    return <div key={apis.id}>
                        <h1 >{apis.sessionName}</h1>
                        <p >{apis.sessionDescription}</p>
                        <button onClick={handleJoin}>Join</button>
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
