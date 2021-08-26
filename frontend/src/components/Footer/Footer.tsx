import React from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className={styles.footer} style={{ color: 'white' }}>
      <Container fluid className='p-4 mr-3 mt-3'>
        <Row className={styles.child}>
          <Col md={8}>
            <Row>
              <Col md={3}>
                <h3>MusicBox</h3>
              </Col>
              <Col md={3}>
                <h4 className={styles.one}>MUSICBOX</h4>
                <ul>
                  <li>About</li>
                  <li>Premuim</li>
                  <li>Features</li>
                </ul>
              </Col>
              <Col md={3}>
                <h4 className={styles.two}>COMMUNITIES</h4>
                <ul>
                  <li>For Artists</li>
                  <li>Developers</li>
                  <li>Press</li>
                </ul>
              </Col>
              <Col md={3}>
                <h4 className={styles.three}>USEFUL LINKS</h4>
                <ul>
                  <li>Help</li>
                  <li>Web Player</li>
                  <li>Explore Channels</li>
                  <li>Download App</li>
                </ul>
              </Col>
            </Row>
          </Col>

          <Col md={4}>
            <div className={styles.icon}>
              <p>
                <i className='fab fa-facebook fa-1x mr-2'></i>
              </p>
              <p>
                <i className='fab fa-twitter fa-1x mr-2'></i>
              </p>
              <p>
                <i className='fab fa-instagram fa-1x mr-2'></i>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
