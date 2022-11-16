import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import MyComponent from './MyComponent'


function SamplePage() {
    /*
    const [api, setApi] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        //fetchApi()
        (
            async () => {
                const user = await fetch('http://localhost:8000/api/authUser', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const loggedUser = await user.json()
                setName(loggedUser.username)
            }
        )();
    })
    

    /*const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/users')
        const data = await response.data
        setApi(data)
    }

    console.log('api: ', typeof (api));
    */

    return (
        <div>
            <h1>Sample Page</h1>
            <h3>Sample Api Call:</h3>
            <h1> Welcome: </h1>
            <MyComponent num={3} />
        </div>
    )
}

export default SamplePage