import React from 'react'
import './ErorrPage.scss'
import Error404 from '../../assets/img/error404.gif'
function ErrorPage() {
    return (
        <div className="error-page">
            <img src={Error404} alt="" />
        </div>
    )
}

export default ErrorPage
