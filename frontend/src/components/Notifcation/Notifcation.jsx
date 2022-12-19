import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Notification() {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
            limit={3}
        />
    )
}

export default Notification
