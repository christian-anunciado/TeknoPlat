import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async () => {
        await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
    }


    /*const loginUser = async () => {
        let formField = new FormData()

        formField.append('email',email)
        formField.append('password',password)

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth',
            headers: {
                'Accept' : 'application/json',
                //'Content-Type': 'application/json;charset=UTF-8'
            },
            data: formField
        }).then((response) => {
            console.log(response.data);
        })
    } */

    return (
        <>

            <div className='container'>
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br />

                <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />

                <Link to="/dashboard" onClick={loginUser}>Login</Link>
            </div>
        </>
    )
}
export default Login
