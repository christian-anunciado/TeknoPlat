import React from 'react'
import { useState } from 'react'

const JoinSession = () => {
    const [roomNo, setRoomNo] = useState('')



    return (
        <div className='joinSession-container'>
            <h1>Join Session</h1>
            <input type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)} />
            <input type="submit" value="Join Room" />

        </div>
    )
}

export default JoinSession