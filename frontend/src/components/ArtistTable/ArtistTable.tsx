import React from 'react';
import artistTableStyles from './ArtistTable.styles';
import clsx from 'clsx';
import cover from '../../assets/playlist-cover.png';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

const ArtistTable = () => {
  const classes = artistTableStyles();
  return (
    <div className={classes.root}>
      <div className={clsx(classes.tableGrid, classes.opaque)}>
        <h6 className={classes.rmMobile}>#</h6>
        <div></div>
        <h6>TITLE</h6>
        <h6 className={classes.rmMobile}>ARTIST</h6>
        <h6 className={classes.rmMobile}>ALBUM</h6>
        <h6 className={classes.rmMobile}>TIME</h6>
        <div></div>
        <div></div>
      </div>

      <div className={clsx(classes.tableGrid)}>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>1</h6>
        <div className={classes.imgContainer}>
          <img src={cover} alt='track cover' className={classes.img} />
        </div>
        <h6 className={clsx(classes.txt, classes.nameFlex)}>
          Rhiannon
          <span className={clsx(classes.opaque, classes.showOnMobile)}>5:53</span>
        </h6>
        <h6 className={clsx(classes.txt, classes.rmMobile)}>David Bowie</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>Fleetwood Mac</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>5:53</h6>
        <FavoriteBorderIcon />
        <AddOutlinedIcon />
      </div>
      <div className={clsx(classes.tableGrid)}>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>1</h6>
        <div className={classes.imgContainer}>
          <img src={cover} alt='track cover' className={classes.img} />
        </div>
        <h6 className={clsx(classes.txt, classes.nameFlex)}>
          Rhiannon
          <span className={clsx(classes.opaque, classes.showOnMobile)}>5:53</span>
        </h6>
        <h6 className={clsx(classes.txt, classes.rmMobile)}>David Bowie</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>Fleetwood Mac</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>5:53</h6>
        <FavoriteBorderIcon />
        <AddOutlinedIcon />
      </div>
      <div className={clsx(classes.tableGrid)}>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>1</h6>
        <div className={classes.imgContainer}>
          <img src={cover} alt='track cover' className={classes.img} />
        </div>
        <h6 className={clsx(classes.txt, classes.nameFlex)}>
          Rhiannon
          <span className={clsx(classes.opaque, classes.showOnMobile)}>5:53</span>
        </h6>
        <h6 className={clsx(classes.txt, classes.rmMobile)}>David Bowie</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>Fleetwood Mac</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>5:53</h6>
        <FavoriteBorderIcon />
        <AddOutlinedIcon />
      </div>
      <div className={clsx(classes.tableGrid)}>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>1</h6>
        <div className={classes.imgContainer}>
          <img src={cover} alt='track cover' className={classes.img} />
        </div>
        <h6 className={clsx(classes.txt, classes.nameFlex)}>
          Rhiannon
          <span className={clsx(classes.opaque, classes.showOnMobile)}>5:53</span>
        </h6>
        <h6 className={clsx(classes.txt, classes.rmMobile)}>David Bowie</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>Fleetwood Mac</h6>
        <h6 className={clsx(classes.txt, classes.opaque, classes.rmMobile)}>5:53</h6>
        <FavoriteBorderIcon />
        <AddOutlinedIcon />
      </div>
    </div>
  );
};

export default ArtistTable;
