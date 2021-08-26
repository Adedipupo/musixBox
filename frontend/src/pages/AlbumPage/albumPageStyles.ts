import { makeStyles } from '@material-ui/core';

const albumMaterialStyles = makeStyles((theme) => ({
  mobileNavIconsBox: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,

    '@media (max-width: 789px)': {
      display: 'flex',
    },
  },
  iconMarginRight: {
    marginRight: 14,
  },
  iconFlex: {
    marginRight: 'auto',
  },
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
      fontSize: 10,
    },

    '@media (max-width: 416px)': {
      width: '120px',
      fontSize: 7,
      height: '34px',
    },
  },
  accordion: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    color: '#FFFFFF !important',
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
    // position: 'absolute',
    // right: '50px',
    // alignSelf
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

    '@media (max-width: 416px)': {
      fontSize: 12,
    },
  },
  view: {
    '@media (max-width: 416px)': {
      fontSize: 11,
    },
  },
  moreContainer: {
    display: 'flex',
    overflowX: 'scroll',
    paddingBottom: '60px',

    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#272a34',
      borderRadius: '4px',
    },
  },
  editBtn: {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    fontSize: 12,
    borderRadius: 30,
  },
  albumDescNone: {
    '@media (max-width: 789px)': {
      display: 'none',
    },
  },
  playlistTimeMobile: {
    display: 'none',

    '@media (max-width: 789px)': {
      display: 'flex',
      alignItems: 'center',
      opacity: 0.7,
    },
  },
  playlistDescription: {
    marginTop: 15,
    textAlign: 'center',
    opacity: 0.7,
    display: 'none',

    '@media (max-width: 789px)': {
      display: 'block',
    },
  },
  root: {
    // border: '1px solid blue'
  },
  disabled: {
    '&$disabled $notchedOutline': {
      borderColor: 'red',
    },
  },
  labelWhite: {
    color: '#FFFFFF !important',
    fontSize: 13,

    '@media (max-width: 463px)': {
      fontSize: 10,
    },
  },
  searchIcon: {
    '@media (max-width: 463px)': {
      fontSize: 12,
    },
  },
  notchedOutline: {
    borderColor: '#FFFFFF !important',
    // border: '1px solid #FFF !important'
  },
  textField: {
    color: '#FFFFFF !important',
    borderBottom: '1px solid #FFF !important',

    '&::placeholder': {
      color: 'red',
    },

    '@media (max-width: 458px)': {
      width: '100px',
    },

    '& .MuiFormLabel-root': {
      color: 'red',
    },
  },
  tableHeading: {
    margin: '40px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistTitle: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  expandIcon: {
    transform: 'rotate(180deg)',
    marginTop: 6,
  },
  playlistSongs: {
    '@media (max-width: 458px)': {
      fontSize: 10,
    },
  },
  addBtnBox: {
    marginTop: 30,
  },
  addBtn: {
    borderRadius: 20,
    padding: '6px 26px',
  },

  link: {
    color: '#FFFFFF',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none',
      color: '#FFFFFF',
    },
  },
  menuPaper: {
    backgroundColor: '#626969 !important',
  },
  spaceBottom: {
    paddingBottom: '60px',
  },
}));

export default albumMaterialStyles;
