import React, { useState, useContext, useEffect } from 'react';
import styles from './Login.module.css';
import { Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
// import {ImFacebook2} from 'react-icons/im';
import { Button, Modal, Form } from 'react-bootstrap';
import Message from '../../components/Message/Message';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
interface Props {
  //declare props here
  show: boolean;
  onHide: () => void;
  showSignup: () => void;
}

const Login = ({ show, onHide, showSignup }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isloading, setError, login } = useContext(AuthContext);

  useEffect(() => {
    setError('');
  }, [setError]);

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={true} className={styles.modalbg}>
        <Modal.Header closeButton style={{ border: 'none' }}></Modal.Header>
        {error && <Message message={error} clearError={() => setError('')} />}
        <Modal.Header className={styles.modalheader}>
          <h4 className={styles.top}>What will you listen to today?</h4>
        </Modal.Header>
        <Form onSubmit={(e) => login(e, email, password)}>
          <Modal.Body style={{ border: 'none' }}>
            <div className='container-fluid'>
              <div className='row mx-auto'>
                <div className='col-md-6 d-flex justify-content-end'>
                  <Button
                    className={styles.buttonOone}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/fb/facebook'
                  >
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginLeft: '1rem' }}>
                        <i className='fab fa-facebook-square fa-2x'></i>
                      </p>
                      <p className={styles.fbButton}>Facebook</p>
                    </div>
                  </Button>
                </div>
                <div className='col-md-6 d-flex justify-content-start'>
                  <Button
                    className={styles.buttonTtwo}
                    variant='light'
                    size='sm'
                    href='https://music-box-b.herokuapp.com/api/v1/music-box-api/auth/google'
                  >
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginLeft: '1rem' }}>
                        <FcGoogle size={24} />
                      </p>
                      <p className={styles.gButton}>Google</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
            <div className='py-4'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter email'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                />
              </Form.Group>
              <Row>
                <Col md={6} xs={6}>
                  <Form.Group className={styles.noAccount} controlId='rememberme'>
                    <Form.Check type='checkbox' style={{ color: '#000000' }} label='Remember me' />
                  </Form.Group>
                </Col>
                <Col md={6} xs={6}>
                  <Button className={styles.login} variant='primary' type='submit'>
                    {isloading ? <Loader type='Bars' color='#2DCEEF' height={20} width={20} /> : 'LOG IN'}
                  </Button>
                </Col>
              </Row>
            </div>
            <p style={{ color: 'white', textAlign: 'center' }}>Or Sign in with</p>
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
            <div>
              <Link
                to='/reset-password'
                className='mb-3'
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#2d9bef',
                  textDecoration: 'none',
                }}
              >
                Forgot your password?
              </Link>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <p style={{ color: '#000000' }}>Don't have an account?</p>
            </div>
          </Modal.Body>
        </Form>
        <Modal.Footer style={{ border: 'none', marginTop: '-2rem', justifyContent: 'center' }}>
          <Button
            onClick={() => {
              onHide();
              showSignup();
            }}
            className={styles.Slogin}
            variant='light'
            type='submit'
          >
            SIGN UP FOR MUSICBOX
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
