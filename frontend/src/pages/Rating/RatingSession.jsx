import React, { useContext, useEffect, useState } from 'react'
import { IconButton } from '@mui/material';
import "./RatingSession.scss"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Rating } from '@mui/material';
import SessionContext from '../../context/SessionContext';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify'
import Api from '../../api/Api';

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
  const [savedRating, setSavedRating] = useState([])

  const [punctuality, setPunctuality] = useState(0)
  const [presentation, setPresentation] = useState(0)
  const [delivery, setDelivery] = useState(0)
  const [innovativeness, setInnovativeness] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [fetchedData, setFetchedData] = useState(null)

  useEffect(() => {
    const fetchSavedRating = async () => {
      const res = await Api.get(`api/getRating/${user.userID}/${session.session[0].id}`)
      if (res.data.length > 0) {
        setSavedRating(res.data)
        setPunctuality(res.data[0].punctuality)
        setPresentation(res.data[0].presentation)
        setDelivery(res.data[0].delivery)
        setInnovativeness(res.data[0].innovativeness)
        setFeedback(res.data[0].feedback)
        setFetchedData(res.data[0])
      }
    }

    fetchSavedRating()
  }, [])

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
      if (fetchedData == null && savedRating.length === 0) {
        const req = await Api.post(`api/rateSession`, formField)
        setFetchedData(req.data);
        toast.success('Rating submitted')
      } else {
        const req = await Api.put(`api/updateRating/${fetchedData.id}`, formField)
        toast.success('Rating updated')
      }
    } catch (err) {
      toast.error('Fail to rate session')
    }
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
              <div className="button_rate">
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
