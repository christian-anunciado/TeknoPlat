import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

const RatingSession = () => {
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
            <select name="Punctuality" id="punctuality">
            <option disabled selected hidden color>Select Option</option>
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
            <select name="Presentation" id="presentation">
            <option disabled selected hidden color>Select Option</option>
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
            <select name="Delivery" id="delivery">
            <option disabled selected hidden color>Select Option</option>
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
            <select name="Innovativeness" id="innovativeness">
            <option disabled selected hidden color>Select Option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="input-box">
            <span className="details">Feedback</span>
            <input type="text" name="Feedback" placeholder="Feedback here"/>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>

      </div>
    </>
  )
}
export default RatingSession
