import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


function Session() {
    const [api, setApi] = useState([])
    const [search, setSearch] = useState([])
    const [password, setPassword] = useState([])
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/joinsession')
        const data = await response.data
        setApi(data)
    }

    const joinSession = async () => {
        await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                password
            })
        });
    } 

    console.log('api: ', typeof (api));

    return (
        <div>
            <h1>SESSIONS: </h1>
            <input type="text" 
                placeholder="Search Session ID" 
                name="search" value={search} 
                onChange = {(e) => setSearch(e.target.value)} 
                />         
            <Link to={`/joinsession/${search}`} ><button>Search</button></Link>
            {api.map((apis) => {
                return <div>
                

                <h1 key={apis.id}>{apis.sessionName}</h1>
                <p key={apis.id}>{apis.sessionDescription}</p>   
                {/* <p key={apis.id}><strong>User ID:</strong> {apis.userID} </p>
                <p key={apis.id}><strong>Session ID:</strong>  {apis.sessionID} </p>
                <p key={apis.id}><strong>Status: </strong>  {apis.status} </p>
                <p key={apis.id}><strong>Start at: </strong>  {apis.startsAt} </p>
                <p key={apis.id}><strong>Ends at: </strong>  {apis.endsAt} </p> */}
            <input type="text" 
                placeholder="Enter Password" 
                name="password" value={password} 
                onChange = {(e) => setPassword(e.target.value)} 
                />

            <Link to={`/insession/${apis.id}`} ><button onClick={joinSession}>Join</button></Link>
            <Link to={`/insession/${apis.id}`} ><button disabled>Leave</button></Link>
                
                <br/><br/>
                
                
                
                </div>
            })}
        </div>
    )
}

export default Session