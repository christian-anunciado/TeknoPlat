import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


function Session() {
    const [api, setApi] = useState([])
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/joinsession')
        const data = await response.data
        setApi(data)
    }

    const handleClick = ({id}) =>{
        console.log("ID: ",id)
    }
    console.log('api: ', typeof (api));

    return (
        <div>
            <h1>Session</h1>

            {api.map((apis) => {
                return <div>

                <p key={apis.id}><strong>User ID:</strong> {apis.userID} </p>
                <p key={apis.id}><strong>Session ID:</strong>  {apis.sessionID} </p>
                <p key={apis.id}><strong>Status: </strong>  {apis.status} </p>
                <p key={apis.id}><strong>Start at: </strong>  {apis.startsAt} </p>
                <p key={apis.id}><strong>Ends at: </strong>  {apis.endsAt} </p>
                
                <Link to={`/joinsession/${apis.id}`} >Details</Link>
                <br/><br/>
                
                
                </div>
            })}
        </div>
    )
}

export default Session