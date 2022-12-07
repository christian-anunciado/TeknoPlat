import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import "./Session.scss"
import "./JoinSessionModal.scss"


function Session() {
    const [api, setApi] = useState([])
    const [search, setSearch] = useState([])
    const [password, setPassword] = useState([])


    //Temp
    const [passwordStatus, setPasswordStatus] = useState(false)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/joinsession/1')
        const data = await response.data
        setApi(data)
    }

    const joinSession = async () => {
        await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                password
            })
        });
    }


    //Temp
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleJoin = (e) => {
        e.preventDefault()

        setPasswordStatus(true)
        toggleModal()

    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (password === api[0].sessionPassword) {
            navigate(`/session`)
        } else {
            alert("Incorrect Password!")
        }

    }

    return (
        <div>
            <Navbar />
            <div className='session-space'>
                <div className="session-container">
                    <div className='session-1 session button'>
                        <input type="text"
                            placeholder="Search Session ID"
                            name="search" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Link to={`/session/${search}`} ><button>Search</button></Link>
                    </div>
                    <div className='session-2 session'>
                        <div className='session-2-1'>Picture</div>
                        {api.map((apis) => {
                            return <div className='session-2-2'>
                                <div className='session-2-2-1'>
                                    <div className="session-2-2-1" key={apis.id}>{apis.sessionName}</div>
                                </div>
                                <div className='session-2-2-2'>
                                    <div className="session-2-2-2" key={apis.id}>{apis.sessionDescription}</div>
                                </div>
                                <div className='session-2-2-3'>
                                    <div className='session-2-2-3-1 button-shaded'>
                                        {/* <Link to={`/insession/${apis.id}`} ><button onClick={joinSession}>Join</button></Link> */}
                                        <button onClick={handleJoin}>Join</button>

                                        {modal && (
                                            <div className="modal">
                                                <div className="overlay">
                                                    <div className="modal-content">
                                                        <div className="verifypassword">
                                                            <div className="verifypassword-1">
                                                                <button onClick={toggleModal}>Close</button>
                                                            </div>
                                                            <div className="verifypassword-2">
                                                                {passwordStatus &&
                                                                    <>
                                                                        <div className="verifypassword-2-1">
                                                                            <input type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                                                                        </div>
                                                                        <div className="verifypassword-2-2">
                                                                            <button onClick={handlePasswordSubmit}>Join</button>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='session-2-2-3-2 button-noshade'>
                                        <Link to={`/insession/${apis.id}`} ><button disabled>Leave</button></Link>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Session
