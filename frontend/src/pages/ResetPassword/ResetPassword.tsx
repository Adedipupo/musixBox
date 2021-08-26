import React, { useState, MouseEvent } from 'react';
import resetPasswordStyles from './ResetPassword.module.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import {Modal} from "react-bootstrap";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const location = useLocation();

  const handleClose = () => setShow(false);
   

  const requestReset = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = process.env.NODE_ENV === "production" ? "https://themusicbox.netlify.app/set-new-password": "http://localhost:3000/set-new-password"
    const token = location.pathname.split("token=")[1]
    console.log("url", url);
    const { data } = await axios.post(
      `https://music-box-b.herokuapp.com/api/v1/music-box-api/users/requestPasswordReset`,
      { email, client_url: url  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEmail('');
    console.log(data.status);
    if (data.status === 'successful') {
      setShow(true)
    } else {
      console.log('error o');
    }
  };
  return (
    <div>
    <div className={resetPasswordStyles.resetBody}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check your email for the reset password link</Modal.Body>
        <Modal.Footer>
          <button className={resetPasswordStyles.okayButton} onClick={handleClose}>
            Okay
          </button>
        </Modal.Footer>
      </Modal>
      <div className={resetPasswordStyles.formCard}>
        <form onSubmit={requestReset}>
          <div className={resetPasswordStyles.header}>
            <h1>Forgot Password</h1>
          </div>
            {/* {successMessage ? <Success /> : null} */}
          <div className={resetPasswordStyles.formGroup}>
            <label>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={resetPasswordStyles.formGroup}>
            <button type='submit' className={resetPasswordStyles.resetButton}>reset</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ResetPassword;
