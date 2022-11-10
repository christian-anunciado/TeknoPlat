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
      <Navbar />
      <div className='createSession-container'>
        <h1> Create Session </h1>
        <input type="text" name="sessionName" value={session.sessionName} placeholder="Session Name" onChange={handleChange} required />
        <input type="password" name="sessionPassword" value={session.sessionPassword} placeholder="Password" onChange={handleChange} required />
        <input type="datetime-local" name="startsAt" value={session.startsAt} placeholder="Date Start and Time" onChange={handleChange} required />
        <input type="text" name="sessionDescription" value={session.sessionDescription} placeholder="Session Description" onChange={handleChange} required />
        <input className='submit-button' type="submit" value="Create Session" onClick={handleSubmit} />
      </div>
    </>
  )
}
export default AddSession
