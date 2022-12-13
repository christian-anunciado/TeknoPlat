import React, { useEffect, useRef } from 'react'

const Message = ({ message, author, role }) => {
    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return (
        <div ref={ref}>
            <div className={`message_wrapper ${author === 'You' && "owner"}`}>
                <div className="message-content">
                    <div className="message_author">
                        {author + " "}
                        {role === 'creator' ? <p>Host</p>
                            : null}
                    </div>
                    <div className="message_body">
                        <p className="message_text">{message}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message
