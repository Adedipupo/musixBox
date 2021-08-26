import { makeStyles } from '@material-ui/core';

const playlistModalStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 9000000000,
  },
  modalClose: {
    position: 'absolute',
    right: 0,
    cursor: 'pointer',

    '&:hover': {
      color: 'orangered',
      transform: 'scale(1.03)',
      transition: 'all .2s ease-in-out',
    },

    '@media (max-width: 1066px)': {
      // left: '70%',
    },

    '@media (max-width: 624px)': {
      // left: '80%',
    },
  },
  modalBox: {
    height: '65vh',
    width: '35vw',
    color: '#FFFFFF',
    padding: 20,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',

    '&::-webkit-scrollbar': {
      height: '4px',
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#272a34',
      borderRadius: '4px',
    },

    '@media (max-width: 1066px)': {
      width: '55vw',
    },

    '@media (max-width: 624px)': {
      width: '75vw',
    },

    '@media (max-width: 458px)': {
      width: '85vw',
      // padding: ,
    },
  },
  playlistHeading: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  songBox: {},
  playlistSong: {
    fontSize: 12,
    margin: 0,

    '@media (max-width: 624px)': {
      fontSize: 10,
    },
  },
  songArtist: {},
  title: {
    fontSize: 15,
    marginRight: 5,
    opacity: 0.7,

    '@media (max-width: 624px)': {
      fontSize: 12,
    },
  },
  playlistContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
    margin: '0 auto',
    marginLeft: '8%',
    width: 'fit-content',
  },

  cardBox: {
    cursor: 'pointer',
    // flex: 1,
    position: 'relative',
    alignSelf: 'start',
    marginRight: 15,
  },

  imgBox: {
    width: '85px',
    height: '85px',
    position: 'relative',

    '@media (max-width: 414px)': {
      width: '65px',
      height: '65px',
    },
  },
  playlistImg: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    borderRadius: '7px',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      transform: 'scale(1.03)',
      border: '2px solid #FFFFFF',
    },
  },
  playlistTitle: {
    margin: 0,
    fontSize: 11,
    opacity: 0.8,

    '@media (max-width: 414px)': {
      fontSize: 8,
    },
  },
  playlistNo: {
    margin: 0,
    fontSize: 9,
    opacity: 0.9,
  },
  t: {},
  btnBox: {
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
  },
  btnSquare: {
    color: '#FFFFFF',
    fontSize: '14px',
    borderRadius: '20px',
    border: '1px solid #FFFFFF',
    transition: 'all .2s ease-in-out',
    width: '200px',
  },
  optionsInput: {
    display: 'none',
  },
  checked: {
    background:
      'transparent linear-gradient(269deg, #9b2def 0%, #2d9bef 61%, #35edfb 100%) 0% 0% no-repeat padding-box',
    border: 'none',
  },
  unChecked: {
    background: 'transparent',
    border: '1px solid #FFFFFF',
  },
  selected: {
    border: '2px solid #FFFFFF',
  },
  playlistIcon: {
    position: 'absolute',
    right: '0%',
    // color: '#000000'
  },
}));

export default playlistModalStyles;
