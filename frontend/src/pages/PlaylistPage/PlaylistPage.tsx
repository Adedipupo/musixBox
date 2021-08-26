import React, { useContext, useState, useEffect } from 'react';
import styles from '../AlbumPage/albumPage.module.css';
import { useFetch } from '../../hooks/use-fetch';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import albumMaterialStyles from '../AlbumPage/albumPageStyles';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { useParams, useHistory, Link } from 'react-router-dom';
import Loader from '../../ui/Loader/Loader';
import { secondsToHms } from '../../utils/utils';
import Grid from '@material-ui/core/Grid';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaylistTable from '../../components/PlaylistTable/PlaylistTable';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import playlistCover from '../../assets/playlistCover.png';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { AuthContext } from '../../context/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CustomizedAlerts from '../../ui/Alert/Alert';
import { MdFavoriteBorder } from 'react-icons/md';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import { useRecentlyPlayed } from '../../hooks/useRecentlyPlayed';

const PlaylistPage = () => {
  const classes = albumMaterialStyles();
  const [playlistId, setPlaylistId] = useState('');
  const { id: urlParams } = useParams<{ id?: string }>();
  const [filterTxt, setFilterTxt] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isRemovingSong, setIsRemovingSong] = React.useState(false);
  const [tracks, setTracks] = React.useState<any>([]);
  const [playlist, setPlaylist] = React.useState<any>(null);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userId = user.data._id;
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  const { handleSongClick, currentSong, setQueueDetails } = useMusicPlayer();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  // generate random track for shuffle
  const shuffleTracks = () => {
    // generate random number based on the number of tracks
    let randomNo = Math.floor(Math.random() * (tracks.length - 1));

    // if random track is the current song playing, change the track
    if (currentSong && currentSong.id === tracks[randomNo].id) {
      randomNo === tracks.length ? (randomNo = 0) : randomNo++;
    }

    // play song
    handleSongClick(tracks[randomNo].id, tracks);
    addToRecentlyPlayed('playlist', playlistId);
    setQueueDetails({
      title: playlist.payload.name,
      source: 'Playlist',
      cover: tracks[randomNo].albumImgUrl,
    });
  };

  const token = user.token;

  const { isLoading, data, error } = useFetch('album-page', `/playlist/${urlParams}`, token);

  useEffect(() => {
    try {
      if (data) {
        const hasBeenLiked = data.payload.likes.includes(user.data._id);
        setPlaylist(data);
        setTracks(data.payload.tracks);
        setPlaylistId(data.payload._id);

        if (hasBeenLiked) {
          setIsLiked(true);
        }
      }
    } catch (e) {}
  }, [data, user]);

  const removeSong = async (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      setIsRemovingSong(true);
      const {
        data: { data },
      } = await axios({
        method: 'delete',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/playlist/${urlParams}`,
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylist(data);
      setTracks(data.payload.tracks);
      setIsRemovingSong(false);
      setAlertType('success');
      setAlertMsg(`song removed from playlist`);
      setOpenAlert(true);
    } catch (e) {
      setAlertType('error');
      setAlertMsg(`an error occurred, try again!`);
      setOpenAlert(true);
      setIsRemovingSong(false);
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);

    try {
      await axios({
        method: 'put',
        url: `https://music-box-b.herokuapp.com/api/v1/music-box-api/playlist/likes/${urlParams}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {}
  };

  return (
    <div className={clsx(styles.albumPage, classes.spaceBottom)}>
      {error && <h1>An error occured, pls try again...</h1>}
      {isLoading && <Loader />}

      {playlist && user && !isLoading && (
        <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
          <div className={classes.mobileNavIconsBox}>
            <IconButton style={{ color: '#FFFFFF', marginRight: 'auto' }}>
              <ArrowBackIcon className={classes.iconFlex} onClick={() => history.goBack()} />
            </IconButton>
            <ShareIcon className={classes.iconMarginRight} />
            <MoreVertIcon />
          </div>
          <div className={styles.albumTop}>
            <figure className={styles.albumImgContainer}>
              <img src={playlist.payload.imgURL || playlistCover} className={styles.albumImg} alt='playlist cover' />
            </figure>
            <div className={styles.albumDetails}>
              <h3 className={styles.albumName}>Created Playlist</h3>
              <h2 className={styles.albumTitle}>{playlist.payload.name}</h2>
              <p className={clsx(styles.albumSubtitle, classes.albumDescNone)}>
                <StarIcon className={styles.albumStar} />
                No description
              </p>
              <p className={clsx(classes.playlistTimeMobile)}>
                <span>{playlist.payload.tracks.length} songs, &nbsp;</span>
                <span>
                  {' '}
                  {secondsToHms(
                    playlist.payload.tracks.reduce((acc: number, track: any) => {
                      return acc + Number(track.duration);
                    }, 0)
                  )}
                </span>
              </p>
              <div className={styles.albumNumbers}>
                <span>{playlist.payload.tracks.length} songs, &nbsp;</span>
                <span>
                  {' '}
                  {secondsToHms(
                    playlist.payload.tracks.reduce((acc: number, track: any) => {
                      return acc + Number(track.duration);
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <div className={styles.albumRight}>
              <div className={styles.albumActions}>
                <Button className={styles.albumBtn} onClick={shuffleTracks}>
                  SHUFFLE PLAY
                </Button>
                {userId === playlist.payload.ownerId && (
                  <Button variant='outlined' className={classes.editBtn} onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Done' : 'Edit'}
                  </Button>
                )}
                <MdFavoriteBorder
                  onClick={handleLike}
                  style={{ fill: isLiked ? 'red' : 'white', border: isLiked ? '1px solid red' : '1px solid white' }}
                  className={[styles.albumActionIcon, styles.albumLoveIcon].join(' ')}
                />
              </div>
              <p className={styles.albumDate}>
                CREATED: &nbsp;
                {new Date(playlist.payload.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className={styles.mobileBtn}>
            {userId === playlist.payload.ownerId && (
              <Button
                variant='outlined'
                className={clsx(classes.outlinedBtn, classes.materialBtn, classes.editBtn)}
                startIcon={isEditing ? <DoneAllOutlinedIcon /> : <EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            )}
            <Button
              variant='contained'
              className={clsx(classes.containedBtn, classes.materialBtn)}
              startIcon={<PlayArrowIcon />}
              onClick={shuffleTracks}
            >
              Shuffle PLAY
            </Button>
          </div>
          <p className={classes.playlistDescription}>No description</p>
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
          {isEditing && (
            <motion.div
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
              transition={transit}
              className={classes.addBtnBox}
            >
              <Button
                variant='contained'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                className={clsx(classes.containedBtn, classes.addBtn)}
                startIcon={<PlaylistAddOutlinedIcon />}
              >
                Add Songs to playlist
              </Button>
            </motion.div>
          )}
          <div className={styles.mobileBtn}>
            <Button
              variant='outlined'
              className={clsx(classes.materialBtn)}
              startIcon={<FavoriteBorderIcon />}
              onClick={handleLike}
              style={{
                color: isLiked ? 'orangered' : '#FFFFFF',
                border: isLiked ? '1px solid orangered' : '1px solid #FFFFFF',
              }}
            >
              Playlist
            </Button>
          </div>
          <div className={classes.tableHeading}>
            <Grid container spacing={1} alignItems='flex-end'>
              <Grid item>
                <SearchOutlinedIcon className={classes.searchIcon} />
              </Grid>
              <Grid item>
                <TextField
                  id='standard-basic'
                  label='playlist search'
                  value={filterTxt}
                  onChange={(e: any) => {
                    setFilterTxt(e.target.value);
                  }}
                  name='search'
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
          <PlaylistTable
            tracks={tracks}
            isEditing={isEditing}
            filterTxt={filterTxt}
            removeSong={removeSong}
            isRemovingSong={isRemovingSong}
            userId={userId}
            ownerId={playlist.payload.ownerId}
            playlistId={playlistId}
            name={playlist.payload.name}
          />
          {/* <RecommendedSongs /> */}
          <CustomizedAlerts
            alertMsg={alertMsg}
            alertType={alertType as 'success' | 'error'}
            open={openAlert}
            onClose={closeAlert}
          />
        </motion.div>
      )}
      <Menu
        style={{ width: '1060px', marginTop: 45 }}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.menuPaper }}
      >
        <MenuItem onClick={handleClose}>
          <Link to='/library/playlist' className={classes.link}>
            Add From Playlist
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/library/album' className={classes.link}>
            Add From Album
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PlaylistPage;
