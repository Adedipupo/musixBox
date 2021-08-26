import { makeStyles } from '@material-ui/core';

const playlistTableStyles = makeStyles((theme) => ({
  table: {
    marginTop: 40,
    paddingBottom: 50,
    fontFamily: 'Lato sans-serif !important',
    transition: 'all .2s',
  },
  tableHeading: {
    transition: 'all .2s',
    display: 'grid',
    gridTemplateColumns: '.1fr .2fr 1.2fr 1.2fr 1.2fr .3fr .2fr',
    justifyContent: 'space-between',
    marginBottom: 1,
    padding: '0px 10px',
    alignItems: 'center',

    '@media (max-width: 982px)': {
      gridTemplateColumns: '.1fr .2fr .5fr .5fr .7fr .2fr .2fr',
    },

    '@media (max-width: 552px)': {
      gridTemplateColumns: '.2fr 1fr .2fr',
    },
  },
  title: {
    fontSize: 13,
    opacity: 0.7,
    fontWeight: 300,
  },
  gridEnd: {
    justifySelf: 'end',
  },
  gridImg: {
    height: 20,
    width: 20,
  },
  trackCover: {
    height: '100%',
    width: '100%',
    display: 'block',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  contentTxt: {
    fontWeight: 400,
    margin: 0,
    fontSize: 11,
  },
  contentOpacity: {
    opacity: 0.7,
  },
  hideOnMobile: {
    '@media (max-width: 552px)': {
      display: 'none',
    },
  },
  nameMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  spanMobile: {
    opacity: 0.7,
    display: 'none',

    '@media (max-width: 552px)': {
      display: 'block',
    },
  },
  showOnHover: {
    '&:hover': {
      backgroundColor: '#313131',
      cursor: 'pointer',
    },
  },
  deleteIcon: {
    transition: 'all .2s',

    '&:hover': {
      color: 'orangered',
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
  noSongs: {
    marginTop: 40,
    fontWeight: 400,
    textAlign: 'center',
    letterSpacing: '1px',
    opacity: 0.7,
    fontSize: 14,
  },
  isPlayingIcon: {
    position: 'absolute',
    marginTop: '4px',
    left: '53%',

    '@media (max-width: 986px)': {
      left: '50%',
    },

    '@media (max-width: 546px)': {
      left: '70%',
    },
  },
  playerIcon: {
    position: 'absolute',
    marginTop: '4px',
    left: '50%',

    '@media (max-width: 986px)': {
      left: '45%',
    },

    '@media (max-width: 546px)': {
      left: '60%',
    },
  },
  currentSong: {
    backgroundColor: '#313131',
  },
  addIcon: {
    fontSize: 12,
  },
}));

export default playlistTableStyles;
