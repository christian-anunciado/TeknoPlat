import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function JoinSession(props) {
    const [api, setApi] = useState([])
    const {id} = useParams();
    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/joinsession/${id}`)
        const data = await response.data
        setApi(data)
    }

    console.log('api: ', typeof (api));
    console.log('state: ', props.state);

    return (
        <div>
            <h1>Join Session</h1>
            {api.map((apis) => {
                return <div>

                <p key={api.id}><strong>User ID:</strong> {apis.userID} </p>
                <p key={api.id}><strong>Session ID:</strong>  {apis.sessionID} </p>
                <p key={api.id}><strong>Status: </strong>  {apis.status} </p>
                <p key={api.id}><strong>Start at: </strong>  {apis.startsAt} </p>
                <p key={api.id}><strong>Ends at: </strong>  {apis.endsAt} </p>
                
                <input type="text" />
                <button> Join Session</button>
                <h2>{props.data}</h2>
                <br/><br/>
                
                
                </div>
            })}
        </div>
    )
}

export default JoinSession