import { makeStyles } from '@material-ui/core';

const artistTableStyles = makeStyles((theme) => ({
  root: {
    marginTop: -20,
  },
  tableGrid: {
    display: 'grid',
    gridTemplateColumns: '.3fr .8fr 2.2fr 2.2fr 2.2fr .8fr .3fr .3fr',
    marginBottom: 10,
    alignItems: 'center',

    '@media (max-width: 789px)': {
      gridTemplateColumns: '.8fr 2.2fr  .5fr .2fr',
    },
  },
  opaque: {
    opacity: 0.7,
  },
  rmMobile: {
    '@media (max-width: 789px)': {
      display: 'none',
    },
  },
  nameFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  showOnMobile: {
    display: 'none',

    '@media (max-width: 789px)': {
      display: 'block',
    },
  },
  imgContainer: {
    height: 35,
    width: 35,
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  txt: {
    fontSize: 14,
    fontWeight: 400,
  },
}));

export default artistTableStyles;
