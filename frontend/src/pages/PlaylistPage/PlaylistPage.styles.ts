import { makeStyles } from '@material-ui/core';

const playlistPage = makeStyles((theme) => ({
  outlinedBtn: {
    border: '1px solid #FFFFFF',
  },
  containedBtn: {
    color: '#FFFFFF',
    background:
      'transparent linear-gradient(269deg, #9B2DEF 0%, #2D9BEF 61%, #35EDFB 100%) 0% 0% no-repeat padding-box',
  },
  materialBtn: {
    width: '171px',
    height: '42px',
    color: '#FFFFFF',
    borderRadius: 40,
    cursor: 'pointer',
    fontSize: 12,

    '@media (max-width: 474px)': {
      width: '140px',
    },

    '@media (max-width: 416px)': {
      width: '120px',
      fontSize: 10,
      height: '34px',
    },
  },
  accordion: {
    background: 'transparent',
    boxShadow: 'none',
    color: '#FFFFFF',
  },
  accordionWrapper: {
    marginTop: 50,
  },
  accordionExpand: {
    color: '#FFFFFF',
  },
  accordionHeading: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  accordionTitle: {},
  accordionTitleIcon: {
    fontSize: 20,
  },
  accordionTitleText: {
    fontSize: 12,
    marginLeft: 10,
  },
  albumSongs: {
    position: 'absolute',
    right: '50px',
    fontWeight: 'normal',
  },
  accContainer: {
    marginBottom: '35px',
  },
  switchBase: {
    color: 'black',
  },
  checked: {
    '&$checked': {
      color: 'black !important',
    },
  },
  downloadBtn: {
    display: 'none',
    alignItems: 'center',
    marginTop: '25px',
    justifyContent: 'space-between',

    '@media (max-width: 789px)': {
      display: 'flex',
    },
  },
  downloadTxt: {
    fontSize: '13px',
    opacity: 0.7,
  },
  more: {},
  moreHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  moreHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  view: {},
  moreContainer: {
    display: 'flex',
    overflowX: 'auto',
    paddingBottom: '60px',
  },
  editBtn: {},
}));

export default playlistPage;
