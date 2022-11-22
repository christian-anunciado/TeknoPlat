import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const Dashboard = ({name}) => {
    const [session,setSession] = useState([]);
    const [username,setUsername] = useState("")
    let form = new FormData();

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
    useEffect(()=>{
        const fetchSession = async () => {
            const response = await axios.get('http://localhost:8000/api/joinsession')
            setSession(response.data)
        }
        fetchSession()
    },[])    
    
    return (
        <div>
            <Navbar/>
            <h1>Dashboard</h1>
         
            <h1> Welcome: {name} </h1>
            <Link to="/login" onClick={logout}>Logout</Link>
            <h1>Sessions:</h1>
            {session.map((sessions, index) => {
                       
                            return (
                              <p>{sessions.sessionName}</p>
                            );
                          
                         
                        })}
        </div>
    )
}

export default Dashboard