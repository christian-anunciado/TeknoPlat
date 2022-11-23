import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import Navbar from '../../components/Navbar-Out/Navbar-Out'
import "./Login.scss"
import AuthContext from '../../context/AuthContext'

const Login = () => {

    let {loginUser} = useContext(AuthContext)

    /*const loginUser = async () => {
        await fetch('http://localhost:8000/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
    } */

    return (
        <>
        <Navbar />
            <div className='login-container'>
            <h1>Login</h1> <br/>
               <form onSubmit={loginUser}>
                    <input 
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    /> <br/>

                    <input 
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    /> <br/>
                    <button className='submit-button' type='submit'>Login</button>
                </form>
            </div>
                
        </>
    )
}
export default Login
