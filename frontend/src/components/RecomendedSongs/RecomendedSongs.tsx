import React from 'react';
import Button from '@material-ui/core/Button';
import recommendedStyles from './RecomendedSongs.styles';
import clsx from 'clsx';
import img from '../../assets/track-cover.png';

const RecommendedSongs = () => {
  const classes = recommendedStyles();
  return (
    <div className={classes.recommended}>
      <div className={classes.recommendedHeading}>
        <Button variant='outlined' className={classes.recommendedBtn}>
          REFRESH
        </Button>
        <h6 className={classes.recommendedTitle}>Recommended songs</h6>
      </div>
      <div className={clsx(classes.recommendedTableHeading, classes.removeMobile)}>
        <h2 className={classes.title}>#</h2>
        <div className={classes.title}></div>
        <p className={classes.title}>TITTLE</p>
        <p className={classes.title}>ARTIST</p>
        <p className={classes.title}>ALBUM</p>
        <div className={clsx(classes.recommendedFlexEnd, classes.title)}></div>
      </div>
      <div className={classes.recommendedTableHeading}>
        <h2 className={clsx(classes.title, classes.opaque, classes.removeMobile)}>1</h2>
        <div className={classes.imgBox}>
          <img src={img} className={classes.img} alt='track cover' />
        </div>
        <p className={classes.title}>Diamond Dogs</p>
        <p className={clsx(classes.title, classes.removeMobile)}>David Bowie</p>
        <p className={clsx(classes.title, classes.opaque, classes.removeMobile)}>The Dark Side of the Moon</p>
        <div className={clsx(classes.recommendedFlexEnd, classes.title)}>
          <Button variant='outlined' className={classes.recommendedBtn} style={{ width: '65px', height: '31px' }}>
            Add
          </Button>
        </div>
      </div>
      <div className={classes.recommendedTableHeading}>
        <h2 className={clsx(classes.title, classes.opaque, classes.removeMobile)}>1</h2>
        <div className={classes.imgBox}>
          <img src={img} className={classes.img} alt='track cover' />
        </div>
        <p className={classes.title}>Diamond Dogs</p>
        <p className={clsx(classes.title, classes.removeMobile)}>David Bowie</p>
        <p className={clsx(classes.title, classes.opaque, classes.removeMobile)}>The Dark Side of the Moon</p>
        <div className={clsx(classes.recommendedFlexEnd, classes.title)}>
          <Button variant='outlined' className={classes.recommendedBtn} style={{ width: '65px', height: '31px' }}>
            Add
          </Button>
        </div>
      </div>
      <div className={classes.recommendedTableHeading}>
        <h2 className={clsx(classes.title, classes.opaque, classes.removeMobile)}>1</h2>
        <div className={classes.imgBox}>
          <img src={img} className={classes.img} alt='track cover' />
        </div>
        <p className={clsx(classes.title, classes.colFlex)}>
          Diamond Dogs
          <span className={classes.showOnMobile}>David Bowie / 6:04</span>
        </p>
        <p className={clsx(classes.title, classes.removeMobile)}>David Bowieaa</p>
        <p className={clsx(classes.title, classes.opaque, classes.removeMobile)}>The Dark Side of the Moon</p>
        <div className={clsx(classes.recommendedFlexEnd, classes.title)}>
          <Button variant='outlined' className={classes.recommendedBtn} style={{ width: '65px', height: '31px' }}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSongs;
