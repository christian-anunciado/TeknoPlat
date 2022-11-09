import React from 'react'

const Settings = () => {
    return (
        <section id="members__container">

            <div id="members__header">
                <p>Participants</p>
                <strong id="members__count">1</strong>
            </div>

            <div id="member__list">
                <div className="member__wrapper" id="member__1__wrapper">
                    <span className="green__icon"></span>
                    <p className="member_name">Christian Anunciado</p>
                </div>
            </div>
        </section>
    )
}

export default Settings