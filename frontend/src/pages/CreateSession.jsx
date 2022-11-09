import React from 'react'
import { useState } from 'react'

const CreateSession = () => {
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

    console.log(session);
    return (
        <div>
            <h1> Create Session </h1>
            <input type="text" name="sessionName" value={session.sessionName} placeholder="Session Name" onChange={handleChange} />
            <input type="password" name="sessionPassword" value={session.sessionPassword} placeholder="Password" onChange={handleChange} />
            <input type="datetime" name="startsAt" value={session.startsAt} placeholder="Date Start and Time" onChange={handleChange} />
            <input type="text" name="sessionDescription" value={session.sessionDescription} placeholder="Session Description" onChange={handleChange} />
            <input type="submit" value="Create Session" />
        </div>

    )
}

export default CreateSession
