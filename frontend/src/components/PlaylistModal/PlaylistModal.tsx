import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import playlistModalStyles from './playlistModal.styles';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
// import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CustomizedAlerts from '../../ui/Alert/Alert';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';

const AddToPlayList = () => {
  const classes = playlistModalStyles();
  const [playlistId, setPlaylistId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/playlist';
  const { setPlaylistModal, playlistModal, globalPlaylist, user, setGlobalPlaylist, setSongToAdd, songToAdd } =
    useContext(AuthContext);
  const history = useHistory();

  const handleClose = () => {
    setPlaylistModal(false);
    setPlaylistId('');
    setSongToAdd(null);
  };

  const handleCreatePlaylist = () => {
    setPlaylistModal(false);
    setPlaylistId('');
    setSongToAdd(null);
    history.push('/library/playlist');
  };

  const handleChange = (e: any) => {
    setPlaylistId(e.target.value);
    console.log(e.target.value);
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const addSongToPlayList = async () => {
    if (!songToAdd || !playlistId) return;
    try {
      setIsAddingSong(true);
      await axios({
        method: 'put',
        url: `${url}/${playlistId}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: songToAdd,
      });

      const addedToPlaylist = globalPlaylist.find((el: any) => el._id === playlistId);

      if (addedToPlaylist) {
        addedToPlaylist.tracks.push(songToAdd);
      }

      setIsAddingSong(false);
      setAlertType('success');
      setAlertMsg(`song added to playlist`);
      setPlaylistId('');
      setOpenAlert(true);
    } catch (e) {
      setIsAddingSong(false);
      setAlertType('error');
      e.response.data.message === 'Track already exists'
        ? setAlertMsg('Track already exist in playlist')
        : setAlertMsg(`an error occurred`);
      setPlaylistId('');
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios({
        method: 'get',
        url: `${url}/created`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGlobalPlaylist(response.data.data.payload);
      setIsLoading(false);
    };

    if (user) {
      if (!globalPlaylist) {
        fetchData();
      } else {
        setIsLoading(false);
      }
    }
  }, [globalPlaylist, setGlobalPlaylist, user]);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={playlistModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={playlistModal} style={{ outline: 'none', background: '#060707', borderRadius: '10px' }}>
        {isLoading && !globalPlaylist ? (
          <div className={classes.modalBox}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader type='Bars' color='#2DCEEF' height={20} width={20} />{' '}
            </div>
          </div>
        ) : (
          <form className={classes.modalBox}>
            <div style={{ position: 'relative' }}>
              <CancelOutlinedIcon onClick={handleClose} className={classes.modalClose} />
              <h2 className={classes.playlistHeading}>select playlist</h2>
            </div>
            <div className={classes.songBox}>
              <p className={classes.playlistSong}>
                <span className={classes.title}>Title:</span> {songToAdd && songToAdd.title}
              </p>
              <p className={classes.playlistSong}>
                <span className={classes.title}>Artist:</span> {songToAdd && songToAdd.artist}
              </p>
            </div>
            <div className={classes.playlistContainer}>
              {globalPlaylist.map((el: any) => (
                <label htmlFor={el._id} key={el._id} className={classes.cardBox}>
                  <input
                    className={classes.optionsInput}
                    value={el._id}
                    id={el._id}
                    onChange={handleChange}
                    checked={playlistId === el._id}
                    type='radio'
                    name='playlist'
                  />
                  <div className={classes.imgBox}>
                    {playlistId === el._id && <CheckCircleOutlineIcon className={classes.playlistIcon} />}
                    <img
                      src={el.imgURL}
                      alt='playlistImg'
                      className={clsx(classes.playlistImg, playlistId === el._id && classes.selected)}
                    />
                  </div>
                  <p className={classes.playlistTitle}>{el.name}</p>
                  <p className={classes.playlistNo}>
                    {el.tracks.length} {el.tracks.length > 1 ? 'songs' : 'song'}{' '}
                  </p>
                </label>
              ))}
            </div>

            {!isLoading && globalPlaylist && !globalPlaylist.length ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '70%',
                  textAlign: 'center',
                }}
              >
                <p>
                  {/* <br /> */}
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleCreatePlaylist}>
                    go to library to create playlist
                  </span>{' '}
                </p>
              </div>
            ) : (
              <div className={clsx(classes.btnBox)}>
                <Button
                  className={clsx(classes.btnSquare, playlistId ? classes.checked : classes.unChecked)}
                  style={{ cursor: playlistId ? 'pointer' : 'not-allowed' }}
                  onClick={addSongToPlayList}
                >
                  {isAddingSong ? <Loader type='Bars' color='#2DCEEF' height={20} width={20} /> : 'Add to playlist'}
                </Button>
              </div>
            )}
            <CustomizedAlerts
              alertMsg={alertMsg}
              alertType={alertType as 'success' | 'error'}
              open={openAlert}
              onClose={closeAlert}
            />
          </form>
        )}
      </Fade>
    </Modal>
  );
};

export default AddToPlayList;
