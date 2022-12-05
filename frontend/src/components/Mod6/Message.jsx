import React from 'react'

const Message = () => {
    return (
        <div>
            <div className="message__wrapper">
                <div className="message__body__bot">
                    <strong className="message__author__bot">🤖 TeknoPlat Bot</strong>
                    <p className="message__text__bot">Welcome to the room, Don't be shy, say hello!</p>
                </div>
            </div>

            <div className="message__wrapper">
                <div className="message__body">
                    <strong className="message__author">Christian Anunciado</strong>
                    <p className="message__text">Lets all learn Java Pitch today!</p>
                </div>
            </div>
        </div>

    )
}

export default Message