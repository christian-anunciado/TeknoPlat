import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { IconButton } from '@mui/material';

import "./RatingSession.scss"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Rating } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '16px',
  p: 4,
};


const RatingSession = () => {
    const [value, setValue] = React.useState(2)
    const [punctuality, setPunctuality] = useState(0)
    const [presentation, setPresentation] = useState(0)
    const [delivery, setDelivery] = useState(0)
    const [innovativeness, setInnovativeness] = useState(0)
    const [feedback, setFeedback] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modal, setModal] = useState(false);


    const rateSession = async () => {
        let formField = new FormData()

        formField.append('punctuality',punctuality)
        formField.append('presentation',presentation)
        formField.append('delivery',delivery)
        formField.append('innovativeness',innovativeness)
        formField.append('feedback',feedback)

        try {
          const req = await axios.post(`http://localhost:8000/api/rateSession`, formField)
          console.log(req.data);
          alert('Succesfully Created')
        } catch (err) {
          alert('Fail to create session')
        }


        // setPunctuality(0)
        // setPresentation(0)
        // setDelivery(0)
        // setInnovativeness(0)
        // setFeedback("") 

    }

    const toggleModal = () =>{
      setModal(!modal);
    };

    if(modal){
        document.body.classList.add('active-modal')
    }else{
        document.body.classList.remove('active-modal')
    }

    const handleJoin = (e) => {
        e.preventDefault()

        toggleModal()

    }
    
  
  return (
    <>
    <Navbar/>
    <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description">
          <div className="rating-space">
            <div className="rating-container">
              <div className = "items-1 item">
                <div className = "items-1-1 item">Rate</div>
                <div className = "items-1-2 item rating-logo">
                  <IconButton onClick = {handleClose} >
                  <HighlightOffIcon/>
                  </IconButton>
                </div>
              </div>
              <div className = "items-2 items">Session Title</div>
              <span className = "rating-line"></span>
              <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    '& > legend': { 
                      mt: 2 ,
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
              <div className = "items-5 item">
                <div className = "items-5-1 item item-direction">
                  <label className="details">Feedback</label>
                  <textarea type="text" name="Feedback" placeholder="Feedback here" onChange={(e) => setFeedback(e.target.value)}/>
                </div>
              </div>
              <div className = "items-6 item button">
                <input type="submit" value="Submit" onClick = {rateSession}/>
              </div>
            </div>
          </div>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default RatingSession
