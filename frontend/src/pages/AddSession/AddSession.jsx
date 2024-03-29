import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AuthContext, { AuthProvider } from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AddSession.scss"
import Api from '../../api/Api';
import { Navigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
const shortid = require('shortid')

const AddSession = () => {
  const { user } = useContext(AuthContext)
  const [session, setSession] = useState({
    // *** BASED ON MODELS *** //
    // id = models.AutoField(primary_key = True)
    // userID = models.IntegerField(blank = True, null = True)
    // sessionID = models.IntegerField(blank = True, null = True)
    // sessionName = models.CharField(max_length = 30)
    // sessionDescription = models.TextField(max_length = 250)
    // sessionPassword = models.CharField(max_length = 30)
    // searchID = models.IntegerField(blank = True, null = True)
    // status = models.IntegerField(blank = True, null = True)
    // startsAt = models.DateTimeField(auto_now=True)
    // endsAt = models.DateTimeField(auto_now=True)
    sessionName: "",
    sessionPassword: "",
    sessionDescription: "",
    startsAt: "",

  })

  const [managementToken, setManagementToken] = useState("")

  useEffect(() => {
    const unsub = async (e) => {
      const req = await Api.get("api/managementToken")
      setManagementToken(req.data)
    }
    unsub()
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setSession((prev) => (
      { ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    const searchID = shortid.generate()

    try {
      const req = await axios.post('https://api.100ms.live/v2/rooms', {
        "name": session.sessionName.replace(/\s/g, ""),
        "description": session.sessionDescription,
        "enabled": true,
        "recording_info": {
          "enabled": false
        },
        "region": "in"
      }, {
        headers: {
          'Authorization': `Bearer ${managementToken}`,
          'Content-Type': 'application/json'
        }
      })
      form.append('sessionName', session.sessionName)
      form.append('sessionPassword', session.sessionPassword)
      form.append('sessionDescription', session.sessionDescription)
      form.append('startsAt', session.startsAt)
      form.append('searchID', searchID)
      form.append('sessionID', req.data.id)
      form.append('creator', user.userID)

      try {
        if ((session.sessionName === "") || (session.sessionPassword === "") || (session.sessionDescription === "") || (session.startsAt === "")) {
          toast.error("Input all fields", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return
        }
        const req = await Api.post(`api/addSession`, form)
        session.sessionName = ''
        session.sessionDescription = ''
        session.sessionPassword = ''
        session.startsAt = ''
        setSession(req.data)
        toast.success("Session Created Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } catch (err) {
        toast.error("Session Creation Failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (err) {
      toast.error(err)
    }
    window.location.reload()
  }

  return (
    <>


      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="add-session">
            <div className="container_box">
              <div className="title">Create Session</div>
              <div className="content">
                <form >
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Session Name</span>
                      <input type="text" name='sessionName' value={session.sessionName} placeholder="Name" onChange={handleChange} required />
                    </div>
                    <div className="input-box">
                      <span className="details">Date and Time</span>
                      <input type="datetime-local" name="startsAt" value={session.startsAt} placeholder="Select date and time" onKeyDown={(e) => e.preventDefault()} onChange={handleChange} min={new Date().toISOString().slice(0, 16)} required />
                    </div>
                    <div className="input-box">
                      <span className="details">Password</span>
                      <input type="password" name="sessionPassword" value={session.sessionPassword} placeholder="Set password" onChange={handleChange} required />

                    </div>
                    <div className="input-box">
                      <span className="details">Session Details</span>
                      <input type="text" name="sessionDescription" value={session.sessionDescription} placeholder="Enter session details" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="button_create">

                    <input type="submit" value="Create" onClick={handleSubmit}
                    />
                    <ToastContainer />

                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default AddSession
