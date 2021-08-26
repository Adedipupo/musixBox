import { makeStyles } from '@material-ui/core';

const recommendedStyles = makeStyles((theme) => ({
  recommended: {
    paddingBottom: 40,
  },
  recommendedHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  recommendedBtn: {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    fontSize: 12,
    borderRadius: 20,
    width: 127,
    height: 40,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  recommendedTableHeading: {
    display: 'grid',
    gridTemplateColumns: '.3fr .4fr 1.3fr 1.3fr  1.3fr .8fr .3fr',
    alignItems: 'center',
    marginBottom: 20,

    '@media (max-width: 656px)': {
      gridTemplateColumns: '.3fr 1fr .3fr',
    },
  },
  recommendedFlexEnd: {
    justifySelf: 'end',
  },
  title: {
    fontSize: 12,
    fontWeight: 400,
  },
  imgBox: {
    height: 35,
    width: 35,
  },
  opaque: {
    opacity: 0.7,
  },
  img: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  removeMobile: {
    '@media (max-width: 656px)': {
      display: 'none',
    },
  },
  showOnMobile: {
    display: 'none',

    '@media (max-width: 656px)': {
      display: 'block',
      opacity: 0.7,
    },
  },
  colFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default recommendedStyles;
