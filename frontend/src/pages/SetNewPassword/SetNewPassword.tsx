import React, { useState, MouseEvent } from 'react';
import setPasswordStyles from './SetNewPassword.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Modal} from "react-bootstrap";

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const { id } = useParams<{ id?: string }>();

  const handleClose = () => setShow(false);

  console.log("Token",id?.split("=")[1])

  const resetPassword = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/users/resetPassword`,
        { password},
        {
          headers: {
            Authorization: `Bearer ${id?.split("=")[1]}`,
          },
        }
      );
      console.log(data);
      
      if (data.status === 'successful') {
        setShow(true)
      } else {
        console.log('error o');
      }
    } catch(e) {
      console.log(e)
    }
    setPassword('');
    setConfirmPassword('');
  };
  return (
    <div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password has been reset successfully</Modal.Body>
        <Modal.Footer>
          <button className={setPasswordStyles.okayButton} onClick={handleClose}>
            Okay
          </button>
        </Modal.Footer>
      </Modal>
    <div className={setPasswordStyles.resetBody}>
      <div className={setPasswordStyles.formCard}>
        <form onSubmit={resetPassword}>
          {error && <p className={setPasswordStyles.error}>{error}</p>}
          <div className={setPasswordStyles.header}>
            <h1>Reset Password</h1>
          </div>
          <div className={setPasswordStyles.formGroup}>
            <label>New Password</label>
            <input
              type='password'
              id='new-password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={setPasswordStyles.formGroup}>
            <label>Confirm Password</label>
            <input
              type='password'
              id='confirm-password'
              name='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={setPasswordStyles.formGroup}>
            <button type='submit'>confirm</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SetNewPassword;
