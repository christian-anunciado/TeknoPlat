import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState([])
    useEffect(() => {
        fetchApi()
    }, []);

    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/users')
        const data = await response.data
        setUser(data)
    }

    console.log('api: ', typeof (api));

    return (
        <div>
            <h1>Login</h1>
            <h3>Enter details</h3>
            <h1> TEST </h1>
            {
              user.map((users) => {
                return <p key = {users.userID}> {users.firstname} </p>
            })}
        </div>
    )
}

export default Login