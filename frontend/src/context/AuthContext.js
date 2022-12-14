import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import Api from '../api/Api';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    let loginUser = async (e) => {
        e.preventDefault()
        let response = await Api.post('api/token/', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            toast.error('Something went wrong')
        }
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        let response = await Api.post('api/token/refresh/', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authToken?.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }
        let time = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authToken) {
                updateToken()
            }
        }, time)
        return () => clearInterval(interval)
    }, [authToken, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
