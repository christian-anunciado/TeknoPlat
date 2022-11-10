import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./AddSession.scss"
const shortid = require('shortid')

const AddSession = () => {
  const baseURL = `http://localhost:8000`
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

  const handleChange = (e) => {
    e.preventDefault()
    setSession((prev) => (
      { ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    const form = new FormData()
    const searchID = shortid.generate()
    console.log("id: ", searchID);

    form.append('sessionName', session.sessionName)
    form.append('sessionPassword', session.sessionPassword)
    form.append('sessionDescription', session.sessionDescription)
    form.append('startsAt', session.startsAt)
    form.append('searchID', searchID)

    try {

      const req = await axios.post(`${baseURL}/api/addSession`, form)
      console.log(req.data);
      alert('Succesfully Created')
    } catch (err) {
      alert('Fail to create session')
    }

  }

  console.log(session);
  return (
    <>

      <Navbar/>
      <div className="add-session">
      <div className="container">
    <div className="title">Create Session</div>
    <div className="content">
      <form >
        <div className="user-details">
          <div className="input-box">
            <span className="details">Session Name</span>
            <input type="text" name='sessionName' value={session.sessionName} placeholder="Name" onChange={handleChange} required/>
          </div>
          <div className="input-box">
            <span className="details">Date and Time</span>
            <input type="datetime-local" name="startsAt" value={session.startsAt}placeholder="Select date and time" onChange={handleChange} required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" name="sessionPassword" value={session.sessionPassword} placeholder="Set password" onChange={handleChange}  required/>
            
          </div>
          <div className="input-box">
            <span className="details">Session Details</span>
            <input type="text" name="sessionDescription" value={session.sessionDescription} placeholder="Enter session details" onChange={handleChange}required/>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Create" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  </div>

      </div>
    </>
  )
}
export default AddSession
