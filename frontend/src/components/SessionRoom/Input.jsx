import { useHMSActions } from '@100mslive/react-sdk'
import React, { useState } from 'react'
import { TbSend } from 'react-icons/tb'


function Input() {
    const hmsActions = useHMSActions()
    const [msg, setMsg] = useState("")

    const handleKeyUp = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleSend()
        }
    }

    const handleSend = async (e) => {
        hmsActions.sendBroadcastMessage(msg)
        setMsg("")
    }

    return (
        <div className="chatsInput-container">
            <div className="chatsInput">
                <input
                    type="text"
                    placeholder='Send a message...'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <TbSend className='send' onClick={handleSend} />
            </div>
        </div>
    )
}

export default Input
