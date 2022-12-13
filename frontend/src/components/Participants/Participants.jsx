import React from 'react'
import { useContext } from 'react'
import SessionContext from '../../context/SessionContext'
import "../../pages/Session/sessionRoom.scss"
import Participant from './Participant'

function Participants() {
    const { session } = useContext(SessionContext)
    const participants = session.participants
    const indexOfCreator = participants.findIndex(item => item.roleName === 'creator')
    participants.unshift(participants.splice(indexOfCreator, 1)[0]);
    return (
        <div className="participants-container">
            <div className="participants">
                {participants.map(participant => (
                    <Participant role={participant.roleName} name={participant.name} key={participant.id} />
                ))}


            </div>
        </div>
    )
}

export default Participants
