import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import LoginNav from '../../components/Nav/LoginNav'
import "./Login.scss"
import AuthContext from '../../context/AuthContext'
import header from '../../assets/img/header.png'

const Login = () => {

    let { user, loginUser } = useContext(AuthContext)

    return (
        user ? <Navigate to={'/dashboard'} /> :
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
                        /> <br />

                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                        /> <br />
                        <button className='submit-button' >Login</button>
                    </form>
                </div>
            </>
    )
}
export default Login
