import React from 'react'
import { useState } from 'react'
import axios from 'axios'



const Register = () => {

    const [firstname, setFN] = useState("")
    const [lastname, setLN] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const registerUser = async () => {
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
        <div>
            <h1>Register</h1>

                <input 
                type="text"
                placeholder="Enter firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => setFN(e.target.value)} 
                /> <br/>

                <input 
                type="text"
                placeholder="Enter lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLN(e.target.value)} 
                /> <br/>

                <input 
                type="text"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                /> <br/>

                <input 
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                /> <br/>

                <input 
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                /> <br/>

                <button onClick={registerUser}>Sign Up</button>

        </div>
    )
}

export default Register