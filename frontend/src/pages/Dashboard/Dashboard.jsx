import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Dashboard.scss'
import Datatable from '../../components/datatable/Datatable'
const Dashboard = () => {
  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Datatable />
        </div>
      </div>
    </>
  )
}
export default Dashboard
