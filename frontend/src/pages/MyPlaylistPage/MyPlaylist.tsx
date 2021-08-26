import React from 'react';
import styles from '../AlbumPage/albumPage.module.css';
import { RiMoreLine } from 'react-icons/ri';
import { MdFavoriteBorder } from 'react-icons/md';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import albumMaterialStyles from '../AlbumPage/albumPageStyles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useFetch } from '../../hooks/use-fetch';
import artistPageStyles from './artistPage.styles';
import Grid from '@material-ui/core/Grid';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import ArtistTable from '../../components/ArtistTable/ArtistTable';
import FeaturedArtist from '../../components/FeaturedArtist/FeaturedArtist';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

const MyPlaylist = () => {
  const classes = albumMaterialStyles();
  const artistStyles = artistPageStyles();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDYyNjY0YzMxNTI0MDAxNWY0ZjQ3YiIsImlhdCI6MTYyNDcyNTgyNywiZXhwIjoxNjI0ODk4NjI3fQ.lZmAcT9-XaUEE3YfA9gv9uaOkeI7ZkK3go-ZOGA3lLo';

  // const { id } = useParams<{id?: string}>();
  const { isLoading, data: playlist, error } = useFetch('playlist-page', `/playlist/60d77f4e89e47f0015a15bba`, token);

  return (
    <div className={artistStyles.artistPage}>
      {error && <h1>error...</h1>}
      {isLoading && (
        <div className={styles.albumLoaderContainer}>
          <Loader type='Bars' color='#2DCEEF' height={50} width={50} />
        </div>
      )}
      {playlist && (
        <>
          <div className={classes.mobileNavIconsBox} style={{ paddingTop: 50 }}>
            <ArrowBackIcon className={classes.iconFlex} />
            <ShareIcon className={classes.iconMarginRight} />
            <MoreVertIcon />
          </div>
          <div className={styles.albumTop}>
            <figure className={styles.albumImgContainer}>
              <img
                src='https://yt3.ggpht.com/ytc/AKedOLRzF4AovWBllZ2YxeJx2QAxoOrWuXwFquzo_Ovgrw=s88-c-k-c0x00ffffff-no-rj'
                className={styles.albumImg}
                alt='album cover'
              />
            </figure>
            <div className={styles.albumDetails}>
              <h3 className={styles.albumName}>Playlist</h3>
              <h2 className={styles.albumTitle}>70s Rock Anthems</h2>
              <p className={styles.albumSubtitle}>
                <StarIcon className={styles.albumStar} />
                {/* {album.artist && album.artist.name} */}
                Golden age of rock. Cover: Led Zeppelin
              </p>
              <div className={styles.albumNumbers}>
                {/* <p>{album.nb_tracks} songs, &nbsp;</p> */}
                <p>10 songs, &nbsp;</p>
                <p> 40 </p>
              </div>
            </div>
            <div className={styles.albumRight}>
              <div className={styles.albumActions}>
                <button className={styles.albumBtn}>Play</button>
                <MdFavoriteBorder className={[styles.albumActionIcon, styles.albumLoveIcon].join(' ')} />
                <RiMoreLine className={[styles.albumActionIcon, styles.albumMoreIcon].join(' ')} />
              </div>
              <p className={styles.albumDate}>387,722 FOLLOWERS</p>
            </div>
          </div>
          <div className={styles.mobileBtn}>
            <Button
              variant='outlined'
              className={clsx(classes.outlinedBtn, classes.materialBtn)}
              startIcon={<FavoriteBorderIcon />}
            >
              ADD ALBUM
            </Button>
            <Button
              variant='contained'
              className={clsx(classes.containedBtn, classes.materialBtn)}
              startIcon={<PlayArrowIcon />}
            >
              PLAY
            </Button>
          </div>
          <div className={classes.downloadBtn}>
            <p className={classes.downloadTxt}>DOWNLOAD</p>
            <Switch
              disableRipple
              classes={{
                switchBase: classes.switchBase,
                checked: classes.checked,
              }}
            />
          </div>
          <div className={classes.tableHeading}>
            <Grid container spacing={1} alignItems='flex-end'>
              <Grid item>
                <SearchOutlinedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id='standard-basic'
                  label='playlist search'
                  className={classes.textField}
                  InputLabelProps={{
                    className: classes.labelWhite,
                  }}
                  InputProps={{
                    className: classes.labelWhite,
                  }}
                />
              </Grid>
            </Grid>
            <p className={classes.playlistTitle}>
              <span className={classes.playlistSongs}>Playlist Songs</span>
              <span>
                <ExpandMoreIcon className={classes.expandIcon} />
              </span>
            </p>
          </div>
          <ArtistTable />
          <div className={artistStyles.featured}>
            <h4 className={artistStyles.featuredHeading}>Featured artists</h4>
            <div className={artistStyles.featuredContainer}>
              <FeaturedArtist />
              <FeaturedArtist />
              <FeaturedArtist />
              <FeaturedArtist />
              <FeaturedArtist />
              <FeaturedArtist />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPlaylist;
