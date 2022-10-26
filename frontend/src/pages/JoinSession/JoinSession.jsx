import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'


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

            <Link to={`/session`} ><button>Go back</button></Link>
            {api.map((apis) => {
                return <div>                
                    <h1 key={apis.id}>{apis.sessionName}</h1>
                    <p key={apis.id}>{apis.sessionDescription}</p>   
                    <Link to={`/insession/${apis.id}`} ><button>Join</button></Link>
                    <Link to={`/insession/${apis.id}`} ><button disabled>Leave</button></Link>
                    <br/><br/>            
                </div>
            })}
        </div>
    )
}

export default JoinSession
