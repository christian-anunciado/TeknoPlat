import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


function SamplePage() {
    const [api, setApi] = useState([])

    useEffect(() => {
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/sample')
        const data = await response.data
        setApi(data)
    }

    console.log('api: ', typeof (api));

    return (
        <div>
            <h1>Sample Page</h1>
            <h3>Sample Api Call:</h3>
            <h1> TEST </h1>
            {api.map((apis) => {
                return <p key={apis.id}> {apis.modelBody} </p>
            })}
        </div>
    )
}

export default SamplePage