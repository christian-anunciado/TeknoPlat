import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import "./EditProfile.scss"
import Navbar from '../../components/Navbar/Navbar'



const EditProfile = () => {

    const [firstname, setFN] = useState("")
    const [lastname, setLN] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const EditUser = async () => {
        let formField = new FormData()

        formField.append('firstname',firstname)
        formField.append('lastname',lastname)
        formField.append('email',email)
        formField.append('username',username)
        formField.append('password',password)
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/add',
            data: formField
        }).then((response) => {
            console.log(response.data);
        })
        setFN("")
        setLN("")
        setEmail("")
        setUsername("")
        setPassword("")
    }
    return (
        <>

        <Navbar/>
        <div className="edit-profile">
        <div className="container">
      <div className="title">Edit Profile</div>
      <div className="content">
        <form >
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input type="text" name='setFN' placeholder="First Name" value={firstname} onChange={(e) => setFN(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Lastname</span>
              <input type="text" name="setLN" placeholder="Last Name" value={lastname} onChange={(e) => setLN(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Username</span>
              <input type="text" name="sessionDescription" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="password" name="sessionDescription" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="button">
            <input type="submit" value="Save" onClick={EditUser}/>
          </div>
        </form>
      </div>
    </div>
  
        </div>
      </>
    )
}

export default EditProfile

