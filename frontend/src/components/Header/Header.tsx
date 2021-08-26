import React, { useContext, useLayoutEffect, useState } from 'react';
import styles from './Header.module.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import { AuthContext } from '../../context/AuthContext';
interface Props {}

const Header = (props: Props) => {
  const [isTop, setIsTop] = useState<boolean>(true);
  const { onHide, setShowSignup, setShowLogin, showLogin, showSignup, user } = useContext(AuthContext);
  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowLogin(true);

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    });
    return () =>
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setIsTop(false);
        } else {
          setIsTop(true);
        }
      });
  }, [isTop]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: isTop ? 'transparent' : '#161a1a',
        zIndex: 1000,
      }}
      className='bg-transparents'
    >
      <Navbar className='bg-transparent' style={{ background: '#000' }} variant='dark' expand='lg'>
        <Navbar.Brand className='ml-5' href='#home'>
          MusicBox
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='#home'>Download</Nav.Link>
            <Nav.Link href='#link'>Help</Nav.Link>{' '}
          </Nav>
          {user ? (
            <div className='ml-5'>
              {' '}
              <Button className={styles.buttonOne} variant='light' size='sm'>
                Logout
              </Button>
            </div>
          ) : (
            <div className='ml-5'>
              <Button className={styles.buttonOne} variant='dark' size='sm' onClick={handleShowLogin}>
                Log in
              </Button>{' '}
              <Button className={styles.buttonTwo} variant='light' size='sm' onClick={handleShowSignup}>
                Sign up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      {showLogin && <Login show={showLogin} showSignup={handleShowSignup} onHide={onHide} />}
      {showSignup && <SignUp show={showSignup} showLogin={handleShowLogin} onHide={onHide} />}
    </header>
  );
};

export default Header;
