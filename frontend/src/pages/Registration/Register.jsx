import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import LoginNav from '../../components/Nav/LoginNav'
import "./Register.scss"


const Register = () => {

    const [first_name, setFN] = useState("")
    const [last_name, setLN] = useState("")
    const [email, setEmail] = useState("")
    const [institute, setInstitute] = useState("")
    const [password, setPassword] = useState("")

    const [username, setUN] = useState("")


    const registerUser = async () => {
        let formField = new FormData()

        formField.append('first_name',first_name)
        formField.append('last_name',last_name)
        formField.append('email',email)
        
        formField.append('username',username)
        formField.append('institute',institute)
        formField.append('password',password)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/signup',
            data: formField
        }).then((response) => {
            console.log(response.data);
        })
        setFN("")
        setLN("")
        setEmail("")
        setInstitute("")
        setUN("")
        setPassword("")
    }
    return (
        <>
        <LoginNav />
        <div className='register-container'>
            <h1>Register</h1>

                <input 
                type="text"
                placeholder="Enter firstname"
                name="first_name"
                value={first_name}
                onChange={(e) => setFN(e.target.value)} 
                /> 

                <input 
                type="text"
                placeholder="Enter lastname"
                name="last_name"
                value={last_name}
                onChange={(e) => setLN(e.target.value)} 
                /> 

                <input 
                type="text"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                /> 

                <input 
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => setUN(e.target.value)} 
                />

                <input 
                type="text"
                placeholder="Enter institute"
                name="institute"
                value={institute}
                onChange={(e) => setInstitute(e.target.value)} 
                /> 

                <input 
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                /> 

                <button className='submit-button' onClick={registerUser}>Sign Up</button>
        </div>
        </>
    )
}

export default Register