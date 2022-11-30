import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'

const Dashboard = ({name}) => {

    const [username,setUsername] = useState("")

    useEffect(() => {
        setUsername(name)
    },[name])
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
    }
    return (
        <div>
            <h1>Sample Page</h1>
            <h3>Sample Api Call:</h3>
            <h1> Welcome: {name} </h1>
            <Link to="/login" onClick={logout}>Logout</Link>
        </div>
    )
}

export default Dashboard