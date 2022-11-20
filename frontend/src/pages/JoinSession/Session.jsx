import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import "./Session.scss"


function Session() {
    const [api, setApi] = useState([])
    const [search, setSearch] = useState([])
    const [password, setPassword] = useState([])
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

    console.log('api: ', typeof (api));

    return (
        <div>
            <Navbar/>
            <div className='session-space'>
                <div className="session-container">
                    <div className='session-1 session button'>
                        <input type="text"
                            placeholder="Search Session ID"
                            name="search" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Link to={`/joinsession/${search}`} ><button>Search</button></Link>
                    </div>
                    <div className='session-2 session'>
                        <div className='session-2-1'>
                            <h1>Picture</h1>
                        </div>
                        {api.map((apis) => {
                        return <div className='session-2-2'>
                            <div className='session-2-2-1'>
                                <h1 key={apis.id}>{apis.sessionName}</h1>
                            </div>
                            <div className='session-2-2-2'>
                                <p key={apis.id}>{apis.sessionDescription}</p>    
                            </div>
                            <div className='session-2-2-3'>
                                <div className='session-2-2-3-1 button-shaded'>
                                    <Link to={`/insession/${apis.id}`} ><button onClick={joinSession}>Join</button></Link>
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
