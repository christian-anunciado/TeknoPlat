import React from 'react'
import ReactLoading from 'react-loading';
import './Loading.scss'
function Loading() {
    return (
        <div className='loading'>
            <ReactLoading color='#000' type='bubbles' />
        </div>
    )
}

export default Loading