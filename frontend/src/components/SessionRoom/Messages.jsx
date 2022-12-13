import React from 'react'
import Message from './Message'
import {
    selectHMSMessages, useHMSStore
} from '@100mslive/react-sdk';

function Messages() {
    const allMessages = useHMSStore(selectHMSMessages)

    console.log(allMessages);

    return (
        <div className='sessionChats-messages'>
            {allMessages.map((msg) =>
                <Message key={msg.id} message={msg.message} author={msg.senderName} role={msg.senderRole} />
            )}
        </div>
    )
}

export default Messages
