import React from 'react'
import ReactLoading from 'react-loading';
import './Loading.scss'
function Loading({ text }) {
    return (
        <div className='loading'>
            <div className="loading-wrapper">

                <ReactLoading color='#000' type='bubbles' />
                <h3>{text}</h3>
            </div>
        </div>
    )
}

export default Loading