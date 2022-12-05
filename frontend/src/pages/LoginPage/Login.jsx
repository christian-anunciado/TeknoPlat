import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import LoginNav from '../../components/Nav/LoginNav'
import "./Login.scss"
import AuthContext from '../../context/AuthContext'
import header from '../../assets/img/header.png'

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
        <LoginNav />
            <div>
                <div>
                    <img src={header} width='900' height='700'></img>
                </div>
                <form onSubmit={loginUser} className='login-container'>
                    <h1>Login</h1> 
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
                        <button className='submit-button' >Login</button>
                    </form>
            </div>
        </>
    )
}
export default Login
