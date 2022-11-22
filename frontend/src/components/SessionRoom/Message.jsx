import React from 'react'

const Message = ({ author, messageContent }) => {
    return (
        <div>
            <div className="message_wrapper">
                <div className="message_body">
                    <strong className="message_author">{author}</strong>
                    <p className="message_text">{messageContent}</p>
                </div>
            </div>
        </div>

    )
}

export default Message
