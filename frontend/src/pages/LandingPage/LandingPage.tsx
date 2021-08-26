import React, { useContext, useEffect } from 'react';
import styles from './LandingPage.module.css';
import { Button, Row, Col, Container, Image, Card } from 'react-bootstrap';
import phone from '../../assets/phone.png';
import flow from '../../assets/flow.svg';
import phonesearch from '../../assets/phonesearch.png';
import hq from '../../assets/hq.png';
import noads from '../../assets/noads.svg';
import offline from '../../assets/offline.svg';
import unlimited from '../../assets/unlimited.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
// import { useToasts } from 'react-toast-notifications';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import { free, premium } from './pricing';

const LandingPage = () => {
  const { loginMessage } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  // const { addToast } = useToasts();

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (loginMessage) {
      setOpen(true);
    }
  }, [loginMessage]);

  return (
    <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
      <Header />
      <div>
        <section className={styles.bgimage}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <h2 className={styles.hText}>
                  Open the world of music. <br /> It's all here{' '}
                </h2>
              </div>
              <div className='container-fluid'>
                <div className='row mx-auto'>
                  <div className='col-md-6 d-flex justify-content-end'>
                    <Button href='#pricing' className={styles.buttonTwo} variant='light' size='lg'>
                      MUSICBOX PREMUIM
                    </Button>
                  </div>
                  <div className='col-md-6 d-flex justify-content-start'>
                    <Button href='#pricing' className={styles.buttonOne} variant='light' size='lg'>
                      MUSICBOX FREE
                    </Button>
                  </div>
                </div>
              </div>
              <p className={styles.hsmall}>
                1-month free trial <span style={{ color: '#2d9bef' }}>$7.99</span>/month
              </p>
            </div>
          </div>
        </section>

        <div className={styles.flow}>
          <Container fluid>
            <Row>
              <Col md={7}>
                <Image src={phone} alt='phone.png' fluid />
              </Col>
              <Col md={5} className={styles.flowsecond}>
                <h1>
                  <Image src={flow} alt='flow.png' style={{ width: '40px', height: '45px' }} fluid />
                  <span style={{ marginLeft: '1rem' }}>FLOW</span>
                </h1>
                <h5 style={{ textAlign: 'left' }}>
                  Listen to a personalized mix of tracks based on your listening history, or create your own mix of
                  genres, artists and playlists - letting you enjoy more of the music you love.
                </h5>
              </Col>
            </Row>
          </Container>
        </div>

        <section className={styles.listen} style={{ color: 'white', fontFamily: 'Lato' }}>
          <div className='py-5 p-5' style={{ marginLeft: '2rem' }}>
            <h4>Listen anytime, anywhere</h4>
            <h5>
              All your favorite songs and episodes are always <br /> available - even without WiFi or LTE.
            </h5>
          </div>
        </section>

        <section className={styles.more}>
          <Container fluid>
            <Row>
              <Col md={2}></Col>
              <Col md={4} className={styles.find}>
                <h2>
                  <span>Find the music you want</span>
                </h2>
                <h5>
                  Search for your favorite songs using the description, or turn on the{' '}
                  <span style={{ color: '#2dceef' }}>MusicFinder </span>feature to find the song that is playing near
                  you.
                </h5>
              </Col>
              <Col md={6}>
                <Image src={phonesearch} alt='phone.png' fluid />
              </Col>
            </Row>
            <div>
              <Row>
                <Col md={12}>
                  <h3
                    className='mb-4'
                    style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '4rem' }}
                  >
                    Why go premium ?
                  </h3>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col md={2}></Col>
                <Col md={8}>
                  <Row>
                    <Col md={3} style={{ textAlign: 'center', color: 'white' }}>
                      <div>
                        <div className='mb-2'>
                          {' '}
                          <Image src={offline} alt='phone.png' fluid />
                        </div>
                        <div style={{ fontFamily: 'lato', fontSize: '15px' }}>
                          {' '}
                          <h5>Offline mode.</h5>
                          <h6>Save and listen anywhere.</h6>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} style={{ textAlign: 'center', color: 'white' }}>
                      <div>
                        <div className='mb-3'>
                          {' '}
                          <Image src={hq} alt='phone.png' fluid />
                        </div>
                        <div style={{ fontFamily: 'lato', fontSize: '15px' }}>
                          {' '}
                          <h5>High quality audio.</h5>
                          <h6>Enjoy the full range of sound.</h6>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} style={{ textAlign: 'center', color: 'white' }}>
                      <div>
                        <div>
                          {' '}
                          <Image src={noads} alt='phone.png' fluid />
                        </div>
                        <div style={{ fontFamily: 'lato', fontSize: '15px' }}>
                          {' '}
                          <h5>No ads.</h5>
                          <h6>Enjoy nonstop music.</h6>
                        </div>
                      </div>
                    </Col>
                    <Col md={3} style={{ textAlign: 'center', color: 'white' }}>
                      <div>
                        <div className='mb-3'>
                          {' '}
                          <Image src={unlimited} alt='phone.png' fluid />
                        </div>
                        <div style={{ fontFamily: 'lato', fontSize: '15px' }}>
                          {' '}
                          <h5>Unlimited skips.</h5>
                          <h6>Just tap skip.</h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={2}></Col>
              </Row>
            </div>
          </Container>

          <div className='py-4'>
            <p style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '2rem' }}>
              Listen free or subscribe to MusicBox Premium.
            </p>
          </div>
          <Container className={styles.pricing} id='pricing'>
            <Row style={{ backgroundColor: '#161a1a' }}>
              <Col className={styles.showme} md={2}></Col>
              <Col md={4} sm={12}>
                <div className='my-2 p-2 mb-2'>
                  <Card className={styles.card} border='light' text='white'>
                    <Card.Body>
                      <h4>MusicBox Free</h4>
                      <Card.Title as='div'>
                        <strong>$0.00/month</strong>
                      </Card.Title>
                    </Card.Body>

                    <Card.Text>
                      <ul className='fa-ul'>
                        {free.map((f) => (
                          <li key={f.name}>
                            <span className='fa-li'>
                              <i style={{ color: f.color }} className={f.icon}></i>
                            </span>
                            <strong>{f.name}</strong>
                          </li>
                        ))}
                        {/* <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          <strong>5 Users</strong>
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          50GB Storage
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Unlimited Public Projects
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Community Access
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Unlimited Private Projects
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Dedicated Phone Support
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Free Subdomain
                        </li> */}
                      </ul>
                    </Card.Text>
                  </Card>
                  <div className={styles.priceButtonDiv}>
                    <Button className={styles.priceButtonOne} variant='light' size='sm'>
                      MUSICBOX FREE
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={4} sm={12}>
                <div className='my-2 p-2 mb-2'>
                  {' '}
                  <Card className={styles.card2} border='primary' text='white'>
                    <Card.Body>
                      <h4>MusicBox Premium</h4>
                      <Card.Title as='div'>
                        <strong>$5.00/month</strong>
                      </Card.Title>
                    </Card.Body>

                    <Card.Text>
                      <ul className='fa-ul'>
                        {premium.map((p) => (
                          <li key={p.name}>
                            <span className='fa-li'>
                              <i style={{ color: p.color }} className={p.icon}></i>
                            </span>
                            <strong>{p.name}</strong>
                          </li>
                        ))}
                        {/* <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          <strong>5 Users</strong>
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          50GB Storage
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Unlimited Public Projects
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Community Access
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Unlimited Private Projects
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Dedicated Phone Support
                        </li>
                        <li>
                          <span className='fa-li'>
                            <i className='fas fa-check'></i>
                          </span>
                          Free Subdomain
                        </li> */}
                      </ul>
                    </Card.Text>
                  </Card>
                  <div className={styles.priceButtonDiv}>
                    <Button className={styles.priceButtonTwo} variant='light' size='sm'>
                      MUSICBOX PREMUIM
                    </Button>
                  </div>
                </div>
              </Col>
              <Col className={styles.showme} md={2}></Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={loginMessage}
        action={
          <React.Fragment>
            <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </motion.div>
  );
};

export default LandingPage;
