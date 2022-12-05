import React from 'react'
import { useState, axios } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import AuthContext from '../context/AuthContext'

const Dashboard = () => {

    const [name1, setName] = useState("")
    let {user,logoutUser} = useContext(AuthContext)
    const [session,setSession] = useState([]);
    const [username,setUsername] = useState("")

    useEffect(()=>{
        const fetchSession = async () => {
            const response = await axios.get('http://localhost:8000/api/joinsession')
            setSession(response.data)
        }
        fetchSession()
    },[])    
    
    return (
      <>
        <div>
            <Navbar/>
            <h1>Dashboard</h1>
         
            <h1> Welcome: {user.first_name} </h1>
            <Link to="/login" onClick={logoutUser}>Logout</Link>
            <h1>Sessions:</h1>
            {session.map((sessions, index) => {
                       
                            return (
                              <p>{sessions.sessionName}</p>
                            );
                          
                         
                        })}
        </div>
      </>
    )
}

export default Dashboard