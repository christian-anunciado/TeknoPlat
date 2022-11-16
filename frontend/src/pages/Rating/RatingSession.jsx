import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

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
    <div className="add-session">
    <div className="container">
    <div className="title">Rate</div>
    <div className="title">Pitch</div>
    <div className="content">
      <form >
        <div className="user-details">
          <div className="input-box">
            <label for="punctuality">Punctuality</label>
            <br></br>
            <select name="Punctuality" id="punctuality" required onChange={(e) => setPunctuality(e.target.value)} >
            <option disabled selected hidden color required>Select Option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="input-box">
            <label for="presentation">Presentation</label>
            <br></br>
            <select name="Presentation" id="presentation" onChange={(e) => setPresentation(e.target.value)} >
            <option disabled selected hidden color required>Select Option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="input-box">
          <div className="selectdiv">
            <label for="delivery">Delivery</label>
            <br></br>
            <select name="Delivery" id="delivery" onChange={(e) => setDelivery(e.target.value)} >
            <option disabled selected hidden color required>Select Option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </div>
          </div>
          <div className="input-box">
            <label for="innovativeness">Innovativeness</label>
            <br></br>
            <select name="Innovativeness" id="innovativeness" onChange={(e) => setInnovativeness(e.target.value)} >
            <option disabled selected hidden color required>Select Option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="input-box">
            <span className="details">Feedback</span>
            <input type="text" name="Feedback" placeholder="Feedback here" onChange={(e) => setFeedback(e.target.value)}/>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Submit" onClick = {rateSession}/>
        </div>
      </form>
    </div>
  </div>

      </div>
    </>
  )
}
export default RatingSession
