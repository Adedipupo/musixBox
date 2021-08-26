import React from 'react';
import featuredArtist from './FeaturedArtist.styles';
import img from '../../assets/feat-img.png';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const FeaturedArtist = () => {
  const classes = featuredArtist();
  return (
    <div className={classes.featured}>
      <figure className={classes.imgContainer}>
        <img src={img} className={classes.img} alt='feat artist' />
      </figure>
      <div className={classes.featuredDetail}>
        <p className={classes.featuredDetailTxt}>Led Zeppelin</p>
        <div className={classes.featuredFave}>
          <FavoriteOutlinedIcon className={classes.featuredIcon} />
          <span>593,164</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtist;
