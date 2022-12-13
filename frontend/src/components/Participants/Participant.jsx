import React from 'react'
import "../../pages/Session/sessionRoom.scss"

function Participant({ role, name }) {
    return (
        <div className={role === 'creator' ? "participant host" : "participant"}>
            <div className="participant-name">
                {name}
            </div>
            {role === 'creator'
                ? <div className="participant-host">
                    Host
                </div>
                : <div className="participant-default">
                    Participant
                </div>
            }
        </div>
    )
}

export default Participant
