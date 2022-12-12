import axios from 'axios'
import React, { useContext, useState } from 'react'
import { IconButton } from '@mui/material';
import "./RatingSession.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Rating } from '@mui/material';
import SessionContext from '../../context/SessionContext';
import AuthContext from '../../context/AuthContext';
import {toast} from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: 4,
};


const RatingSession = ({ setRatingsModalState, ratingsModalState, roomEnded, setRoomEnded, roomEndedNotif }) => {

  // Context
  const { user } = useContext(AuthContext)
  const { session } = useContext(SessionContext)
  
  const [punctuality, setPunctuality] = useState(0)
  const [presentation, setPresentation] = useState(0)
  const [delivery, setDelivery] = useState(0)
  const [innovativeness, setInnovativeness] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [fetchedData, setFetchedData] = useState(null)

  console.log(fetchedData);
  const [modal, setModal] = useState(false);

  const rateSession = async () => {
    let formField = new FormData()

    formField.append('punctuality', punctuality)
    formField.append('presentation', presentation)
    formField.append('delivery', delivery)
    formField.append('innovativeness', innovativeness)
    formField.append('feedback', feedback)
    formField.append('creator', user.userID)
    formField.append('sessionID', session.session[0].id)

    try {
      if(fetchedData == null){
        const req = await axios.post(`http://localhost:8000/api/rateSession`, formField)
        console.log(req.data);
        setFetchedData(req.data);
        toast.success('Succesfully Created')
      }else{
        const req = await axios.put(`http://localhost:8000/api/updateRating/${fetchedData.id}`, formField)
        toast.success('Succesfully Updated')
      }
    } catch (err) {
        toast.error('Fail to create session')
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleJoin = (e) => {
    e.preventDefault()
    toggleModal()
  }

  const handleClose = () => {
    setRatingsModalState(false);
    if (roomEndedNotif && roomEnded === false) {
      setRoomEnded(true)
    }
  }

  return (
    <Modal
      open={ratingsModalState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Typography id="modal-modal-description">
          <div className="rating-space">
            <div className="rating-container">
              <div className="items-1 item">
                <div className="items-1-1 item">Rate</div>
                <div className="items-1-2 item rating-logo">
                  <IconButton onClick={handleClose} >
                    <HighlightOffIcon />
                  </IconButton>
                </div>
              </div>
              <div className="items-2 items">{session.session[0].sessionName}</div>
              <span className="rating-line"></span>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  '& > legend': {
                    mt: 2,
                  },
                }}
                >
                <Typography component="legend">Goals and Significance</Typography>
                <Rating
                  component="legend"
                  name="goal"
                  value={punctuality}
                  onChange={(event, newValue) => {
                    setPunctuality(newValue);
                  }}
                />
                <Typography component="legend">Plan and Timeline</Typography>
                <Rating
                  name="plan"
                  value={presentation}
                  onChange={(event, newValue) => {
                    setPresentation(newValue);
                  }}
                />
                <Typography component="legend">Resource Request</Typography>
                <Rating
                  name="resource"
                  value={delivery}
                  onChange={(event, newValue) => {
                    setDelivery(newValue);
                  }}
                />
                <Typography component="legend">Relevant Experience</Typography>
                <Rating
                  name="relevant"
                  value={innovativeness}
                  onChange={(event, newValue) => {
                    setInnovativeness(newValue);
                  }}
                />
              </Box>
              <div className="items-5 item">
                <div className="items-5-1 item item-direction">
                  <label className="details">Feedback</label>
                  <textarea type="text" name="Feedback" placeholder="Feedback here" onChange={(e) => setFeedback(e.target.value)} value={feedback} />
                </div>
              </div>
              <div className="items-6 item button">
                <input type="submit" value="Submit" onClick={rateSession} />
              </div>
            </div>
          </div>
        </Typography>
      </Box>
    </Modal>
  )
}

export default RatingSession
