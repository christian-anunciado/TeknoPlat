import React from 'react'
import { useState, axios } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import AuthContext from '../../context/AuthContext'

import Sidebar from '../../components/sidebar/Sidebar'

import './Dashboard.scss'
import Datatable from '../../components/datatable/Datatable'
import Notification from '../../components/Notifcation/Notifcation'
const Dashboard = () => {
  return (
    <>

      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Datatable />
        </div>
        <Notification />
      </div>
    </>
  )
}
export default Dashboard
