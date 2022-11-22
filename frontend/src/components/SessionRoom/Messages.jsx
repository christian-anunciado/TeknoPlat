import React from 'react'
import Message from './Message'
import {
    selectHMSMessages, useHMSStore
} from '@100mslive/react-sdk';

function Messages() {
    const allMessages = useHMSStore(selectHMSMessages)

    return (
        <div className='sessionChats-messages'>
            {allMessages.map((msg) =>
                <Message key={msg.id} author={msg.senderName} messageContent={msg.message} />
            )}
        </div>
    )
}

export default Messages