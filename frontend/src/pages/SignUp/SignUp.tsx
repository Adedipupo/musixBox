import React, { useState, useContext, useEffect } from 'react';
import styles from './SignUp.module.css';
import { Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import Message from '../../components/Message/Message';
import { Button, Modal, Form } from 'react-bootstrap';
interface Props {
  //declare props here
  show: boolean;
  onHide: () => void;
  showLogin: () => void;
}

const SignUp = ({ show, onHide, showLogin }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');

  const { error, isloading, setError, register } = useContext(AuthContext);

  useEffect(() => {
    setError('');
  }, [setError]);

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={true} className={styles.modalbg}>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        {error && <Message message={error} clearError={() => setError('')} />}
        <Modal.Header className={styles.modalheader}>
          <Modal.Title style={{ border: 'none', margin: 'auto', fontWeight: 'bold' }}>
            Ready to Sign Up today?
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => register(e, email, password, firstName, lastName, date, gender)}>
          <Modal.Body style={{ border: 'none' }}>
            <div className='container-fluid'>
              <div className='row mx-auto'>
                <div className='col-md-6 d-flex justify-content-end  mb-2'>
                  <Button
                    className={styles.buttonOone}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/fb/facebook'
                  >
                    <div className={styles.fbDiv}>
                      <p className={styles.fbDivp}>
                        <i className='fab fa-facebook-square fa-2x'></i>
                      </p>
                      <p className={styles.fbButton}>Facebook</p>
                    </div>
                  </Button>
                </div>
                <div className='col-md-6 d-flex justify-content-start mb-2'>
                  <Button
                    className={styles.buttonTtwo}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/auth/google'
                  >
                    <div className={styles.gDiv}>
                      <p className={styles.gDivp}>
                        <FcGoogle size={24} />
                      </p>
                      <p className={styles.gButton}>Google</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Form.Group controlId='formBasicEmail'>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter email'
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </Form.Group>
              <Form.Group controlId='firstName'>
                <Form.Control
                  type='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name='firstName'
                  placeholder='Firstname'
                />
              </Form.Group>
              <Form.Group controlId='lastname'>
                <Form.Control
                  type='lastname'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Lastname'
                />
              </Form.Group>
              <Row>
                <Col md={6} xs={6}>
                  <Form.Group controlId='dob' className={styles.bodnew}>
                    <Form.Control
                      type='date'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder='Date of Birth'
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xs={6} className={styles.gendernew}>
                  <Form.Group controlId='ControlSelect1'>
                    <Form.Control type='gender' value={gender} onChange={(e) => setGender(e.target.value)} as='select'>
                      <option value='none' selected hidden>
                        Select Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <p style={{ color: 'white', textAlign: 'center', marginTop: '-1rem' }}>Or Sign up with</p>
            <div className={styles.socialIconShow}>
              <p>
                <a href='https://music-box-b.herokuapp.com/api/v1/music-box-api/fb/facebook'>
                  <i className='fab fa-facebook-square fa-3x' style={{ color: '#0040ff' }}></i>
                </a>
              </p>
              <p className='mr-2 ml-2'>
                <a href='https://music-box-b.herokuapp.com/api/v1/music-box-api/auth/google'>
                  <FcGoogle size={45} />
                </a>
              </p>
            </div>
            <p className={styles.agree} style={{ textAlign: 'center' }}>
              By clicking on "Sign up", you accept the Terms and Conditions of Use
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button className={styles.signup} type='submit'>
                {isloading ? <Loader type='Bars' color='#2DCEEF' height={20} width={20} /> : 'SIGN UP FOR MUSICBOX'}
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ border: 'none', marginTop: '-1rem', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p>
                Already have account?{' '}
                <span
                  className={styles.log}
                  onClick={() => {
                    onHide();
                    showLogin();
                  }}
                >
                  Log in
                </span>
              </p>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SignUp;
