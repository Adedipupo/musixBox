import { makeStyles } from '@material-ui/core';

const tracksTableStyles = makeStyles((theme) => ({
  tracksWrapper: {
    width: '100%',
  },
  tracksGrid: {
    display: 'grid',
    gridTemplateColumns: '.1fr 1.4fr 1.4fr .3fr .1fr .1fr',
    marginBottom: 1,
    position: 'relative',
    padding: '10px 8px',

    '@media (max-width: 784px)': {
      gridTemplateColumns: '.1fr 1.4fr  .1fr',
    },
  },
  title: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontWeight: 300,

    '@media (max-width: 784px)': {
      display: 'none',
    },
  },
  track: {
    fontWeight: 300,

    '@media (max-width: 784px)': {
      fontSize: 11,
    },
  },
  trackBtn: {
    color: '#FFFFFF',

    '&:hover': {
      transform: 'scale(1.08)',
      transition: 'all ease-in .5s',
    },
  },
  trackIcon: {
    cursor: 'pointer',
  },
  hideMobile: {
    '@media (max-width: 784px)': {
      display: 'none',
    },
  },
  moreIcon: {
    color: '#FFFFFF',
    // alignSelf: 'start',
    // marginTop: '-10px',
    display: 'none',
    fontSize: 13,

    '@media (max-width: 784px)': {
      display: 'block',
    },
  },
  trackMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  durationMobile: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
    display: 'none',

    '@media (max-width: 784px)': {
      display: 'block',
    },
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemMenu: {
    backgroundColor: theme.palette.grey[100],
    marginBottom: 4,
  },
  menuItemText: {
    marginLeft: 12,
  },
  showOnHover: {
    '&:hover': {
      backgroundColor: '#313131',
      cursor: 'pointer',
    },
  },
  trackTxt: {
    fontSize: 12,
  },
  currentSong: {
    backgroundColor: '#313131',
  },
  playingSong: {},
  isPlayingIcon: {
    position: 'absolute',
    marginTop: '9px',
    left: '70%',

    '@media (max-width: 771px)': {
      marginTop: 18,
      left: '58%',
    },
  },
  playerIcon: {
    position: 'absolute',
    marginTop: '9px',
    left: '66%',

    '@media (max-width: 771px)': {
      marginTop: 18,
      left: '70%',
    },
  },
}));

export default tracksTableStyles;
