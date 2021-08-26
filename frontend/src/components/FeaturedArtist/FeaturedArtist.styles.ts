import { makeStyles } from '@material-ui/core';

const featuredArtist = makeStyles((theme) => ({
  featured: {
    width: 165,
    marginRight: 20,
    marginTop: 30,
  },
  imgContainer: {
    height: 165,
    width: 165,
  },
  img: {
    height: '100%',
    width: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  featuredDetail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
  },
  featuredDetailTxt: {
    fontSize: 14,
  },
  featuredFave: {
    display: 'flex',
    opacity: 0.7,
    marginTop: 6,
    fontSize: 10,
  },
  featuredIcon: {
    fontSize: 12,
    marginRight: 2,
  },
}));

export default featuredArtist;
