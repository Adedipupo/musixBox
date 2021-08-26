import { makeStyles } from '@material-ui/core';
import img from '../../assets/playlist-bg.png';

const artistPageStyles = makeStyles((theme) => ({
  artistPage: {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: '0 20vh',
    paddingTop: '130px',
    paddingBottom: '130px',
    minHeight: '100vh',
    height: ' 100%',
    margin: '0',
    color: ' #ffffff',

    '@media (max-width: 789px)': {
      padding: '0 6vh',
    },
  },

  mobileIconsBox: {},

  featured: {
    marginTop: 40,
  },
  featuredHeading: {},
  featuredContainer: {
    display: 'flex',
    overflowX: 'auto',
  },
}));

export default artistPageStyles;
