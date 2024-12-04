import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: ""
};
export const Contact = (props) => {
  const [{ name, email, message, phone }, setState] = useState(initialState);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (phone) => {
    setState((prevState) => ({ ...prevState, ['phone']: phone }));
  }
  
  const clearState = () => setState({ ...initialState });
  emailjs.init("OXlpsV8RTZSTsi-zW");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, email, message, phone);
    
    {/* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */ }
    
    emailjs.send("skydot_service","template_d0s77wj",{
      to_name: "Team",
      from_name: name,
      message: message,
      reply_to: email,
      phone_number: phone
    }).then((result) => {
      console.log(result.text);
      clearState();
    });

    clearState();

    // emailjs
    //   .sendForm("skydot_service", "template_d0s77wj", e.target, "YOUR_PUBLIC_KEY")
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       clearState();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        value={name}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={email}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <PhoneInput
                      defaultCountry="in"
                      name="phone"
                      placeholder="phone"
                      required
                      onChange={(phone) => handlePhoneChange(phone)}
                      value={phone}
                    />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                    value={message}
                  >{message}</textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  Address
                </span>
                <i className="fa fa-map-marker"></i> {props.data ? props.data.address.calicut : "loading"}
                <br/><br/>
                <i className="fa fa-map-marker"></i> {props.data ? props.data.address.Thirupur : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                {props.data ? props.data.phone.map((item, index) => (
                  <span key={index}>
                    <i className="fa fa-phone"></i> {item}
                  </span>
                )) : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.whatsapp : "/"}>
                      <i className="fa fa-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
