import { makeStyles } from '@material-ui/core';

const albumCard = makeStyles((theme) => ({
  materialBtn: {
    '@media (max-width: 474px)': {
      width: '140px',
    },

    '@media (max-width: 416px)': {
      width: '120px',
      fontSize: 10,
      height: '34px',
    },
  },
  albumCard: {
    cursor: 'pointer',
    minWidth: '170px',

    '&:not(:last-child)': {
      marginRight: 15,

      '@media (max-width: 416px)': {
        marginRight: -25,
      },
    },
  },
  albumImgBox: {
    height: '140px',
    width: '90%',
    marginBottom: 20,

    '@media (max-width: 416px)': {
      height: '100px',
      width: '70%',
    },
  },
  albumImg: {
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  albumTitle: {
    fontSize: '13px',
    fontWeight: 400,
    opacity: 0.8,
  },
  albumDate: {
    fontSize: '12px',
    fontWeight: 300,
    opacity: 0.7,
  },
}));

export default albumCard;
