import React from 'react'
import { useState, axios } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import AuthContext from '../../context/AuthContext'

import Sidebar from '../../components/sidebar/Sidebar'
import Table from '../../components/table/Table'
import './Dashboard.scss'
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
     
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <div className="listContainer">
          <div className="listTitle">Sessions</div>
          <Table />
        </div>
      </div>
    </div>
      </>
    )
}

export default Dashboard