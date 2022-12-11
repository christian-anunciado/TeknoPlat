import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import "./RatingSession.scss"

const AverageSession = () => {
    const [modal, setModal] = useState(false);
    const averageSession = async () => {
        let formField = new FormData()

        //Return Session ID or pass to View.py
        formField.append('sessionID', 1)


        try {
          const req = await axios.post(`http://localhost:8000/api/AverageRatingsSession`, 1)
          console.log(req.data);
          alert('Succesfully Created')
        } catch (err) {
          alert('Fail to create session')
        }

        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/AverageRatingsSession ',
            data: formField,
        }).then((response) => {
            console.log(response.data);
        })
        
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
                              <div className = "items-6 item button">
                                <input type="submit" value="Submit" onClick = {averageSession}/>
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
export default AverageSession
