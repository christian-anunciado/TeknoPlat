import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./RatingSession.scss"

const RatingSession = () => {
    const [punctuality, setPunctuality] = useState("")
    const [presentation, setPresentation] = useState("")
    const [delivery, setDelivery] = useState("")
    const [innovativeness, setInnovativeness] = useState("")
    const [feedback, setFeedback] = useState("")


    const rateSession = async () => {
        let formField = new FormData()

        formField.append('punctuality',punctuality)
        formField.append('presentation',presentation)
        formField.append('delivery',delivery)
        formField.append('innovativeness',innovativeness)
        formField.append('feedback',feedback)

        try {
          const req = await axios.post(`http://localhost:8000/api/addSession`, formField)
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
  
  return (
    <>
    <Navbar/>
    <div className="rating-space">
      <div className="rating-container">
        <div className = "items-1 item">
          <div className = "items-1-1 item">Rate</div>
          <div className = "items-1-2 item">Close</div>
        </div>
        <div className = "items-2 item">Session Title</div>
        <div className = "items-3 item">
          <div className = "items-3-1 item item-direction">
            <label for="punctuality">Punctuality</label>
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
            <label label for="presentation">Presentation</label>
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
            <label for="delivery">Delivery</label>
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
            <label for="innovativeness">Innovativeness</label>
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
    </>
  )
}
export default RatingSession
