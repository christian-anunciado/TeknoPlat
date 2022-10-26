import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function InSession(props) {
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
            <h1>WELCOME!!</h1>
            {api.map((apis) => {
                return <div>
                <p key={api.id}><strong>You are currently in session: </strong> {apis.sessionName} </p>                      
                </div>
            })}
        </div>
    )
}

export default InSession
