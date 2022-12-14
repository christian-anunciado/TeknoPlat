import React from 'react'
import { useState } from 'react'
import LoginNav from '../../components/Nav/LoginNav'
import "./Register.scss"
import { useNavigate } from 'react-router-dom'
import Api from '../../api/Api'


const Register = () => {

    const [first_name, setFN] = useState("")
    const [last_name, setLN] = useState("")
    const [email, setEmail] = useState("")
    const [institute, setInstitute] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const [username, setUN] = useState("")

    const navigate = useNavigate()


    const registerUser = async () => {
        let formField = new FormData()

        formField.append('first_name', first_name)
        formField.append('last_name', last_name)
        formField.append('email', email)

        formField.append('username', username)
        formField.append('institute', institute)
        formField.append('password', password)

        await Api.post('api/signup',
            formField
        ).then((response) => {
            console.log(response.data);
            if (response.data == '200') {
                alert('User Successfuly Created')
                navigate('/login')
            } else {
                alert('Something went wrong. Please try again')
            }
        })

        setFN("")
        setLN("")
        setEmail("")
        setInstitute("")
        setUN("")
        setPassword("")
    }

    const checkPassword = (e) => {
        const confPass = e.target.value
        setConfirmPassword(confPass);
        if (password != confPass) {
            setError("Passwords do not match");
        } else {
            setError(" ");
        }
    };

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => checkPassword(e)}
                />
                <div style={{ color: "red", fontSize: 15 }}>{error}</div>
                <button className='submit-button' onClick={registerUser}>Sign Up</button>
            </div>
        </>
    )
}

export default Register
