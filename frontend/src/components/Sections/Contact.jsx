import React, { useRef} from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import "./Contact.scss";
// Assets

export default function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    if ((e.target.fullName.value === "") || (e.target.email.value === "") || (e.target.subject.value === "")) {
      toast.error("Please fill all the fields",{
        position: "top-right",
      })
        e.target.reset()
    }  else{
      toast.success("Message sent successfully",{
        position: "top-right",
      })
      emailjs.sendForm('service_bke5l3b', 'template_rozvv3a',form.current, 'Oz3eA0C8uPrtwmMCG')
  
      .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      
      e.target.reset()
    }
   
   
  };

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Let's get in touch</h1>
            <p className="font13">
              We are always open to discussing new projects, creative ideas or
              <br />
              opportunities to be part of your visions.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <form ref={form} action="" className="forms" onSubmit={sendEmail}>
                <label className="font13">Name:</label>
                <input type="text" id="fname" name="fullName" className="font20 extraBold" />
                <label className="font13">Email:</label>
                <input type="text" id="email" name="email" className="font20 extraBold" />
                <label className="font13">Subject:</label>
                <input type="text" id="subject" name="subject" className="font20 extraBold" />
                <textarea rows="4" cols="50" type="text" id="message" name="message" className="font20 extraBold" />
                <button className="buttons">
                  Send Message
                </button>
                <ToastContainer />
              </form>
           
            </div>
         
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
   
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;

const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;









