import { useHMSActions } from '@100mslive/react-sdk';
import React from 'react'
import { toast } from 'react-toastify';
import './Raisehand.scss'

function Raisehand({ peer }) {
  const hmsActions = useHMSActions()

  const handleUnmute = async () => {
    try {
      await hmsActions.setRemoteTrackEnabled(peer.audioTrack, true);
    } catch (err) {
      toast.error(err)
    }
  }
  return (
    <div className='raiseHand'>
      {`${peer.name} raised their hand.`}
      <button onClick={handleUnmute}>Unmute</button>
    </div>
  )
}

export default Raisehand
