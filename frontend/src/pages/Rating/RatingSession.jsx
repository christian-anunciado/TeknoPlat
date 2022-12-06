import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import "./RatingSession.scss"

const RatingSession = () => {
    const [punctuality, setPunctuality] = useState("")
    const [presentation, setPresentation] = useState("")
    const [delivery, setDelivery] = useState("")
    const [innovativeness, setInnovativeness] = useState("")
    const [feedback, setFeedback] = useState("")

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

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/rateSession ',
            data: formField
        }).then((response) => {
            console.log(response.data);
        })
        setPunctuality("")
        setPresentation("")
        setDelivery("")
        setInnovativeness("")
        setFeedback("")

        
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
    <div className='session-2-2-3-1 button-shaded'>
    <button onClick={handleJoin}>Join</button>

      {modal && (
          <div className="modal">
              <div className="overlay">
                  <div className="modal-content">
                      <div className="verifypassword">
                          <div className="rating-space">
                            <div className="rating-container">
                              <div className = "items-1 item">
                                <div className = "items-1-1 item">Rate</div>
                                <div className = "items-1-2 item">
                                  <button onClick={toggleModal}>Close</button>
                                </div>
                              </div>
                              <div className = "items-2 item">Session Title</div>
                              <div className = "items-3 item">
                                <div className = "items-3-1 item item-direction">
                                  <label for="punctuality">Goal</label>
                                  <select name="Punctuality" id="punctuality" required onChange={(e) => setPunctuality(e.target.value)} >
                                  <option disabled selected hidden color required>Select Option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                                <div className = "items-3-2 item item-direction">
                                  <label label for="presentation">Plan</label>
                                  <select name="Presentation" id="presentation" onChange={(e) => setPresentation(e.target.value)} >
                                  <option disabled selected hidden color required>Select Option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                              </div>
                              <div className = "items-4 item">
                                <div className = "items-4-1 item item-direction">
                                  <label for="delivery">Resources</label>
                                  <select name="Delivery" id="delivery" onChange={(e) => setDelivery(e.target.value)} >
                                  <option disabled selected hidden color required>Select Option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                                <div className = "items-4-2 item item-direction">
                                  <label for="innovativeness">Relevance</label>
                                  <select name="Innovativeness" id="innovativeness" onChange={(e) => setInnovativeness(e.target.value)} >
                                  <option disabled selected hidden color required>Select Option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>
                              </div>
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
                      </div>
                  </div>
              </div>
          </div>
      )}
      </div>    
    </>
  )
}
export default RatingSession
