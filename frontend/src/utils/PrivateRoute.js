import { Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react'
import AuthContext from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";

const PrivateRoute = () => {
    let { user } = useContext(AuthContext)
    return (
        !user ? <Navigate to={'/'} /> : <Outlet />
    )
}

export default PrivateRoute;