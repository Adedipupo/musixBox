import React, { useContext } from 'react';
import genrePlaylist from './GenrePlaylist.module.css';
import { FcLike } from 'react-icons/fc';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Modal from '../../ui/Modal/Modal';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CustomizedAlerts from '../../ui/Alert/Alert';
import BackdropRoller from '../../ui/Backdrop/Backdrop';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

interface Props {
  playlists: any[];
  showHidden: (a: string) => void;
}

const GenrePlaylist: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState('success');
  const [alertMsg, setAlertMsg] = React.useState('');
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;

  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';

  const openHandler = () => {
    setOpen(true);
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addData = async (data: Record<string, any>) => {
    setOpenBackdrop(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${URL}/playlist`, data, config);
      setOpenBackdrop(false);
      setAlertMsg('Playlist added successfully');
      setAlertType('success');
      setOpenAlert(true);
    } catch (error) {
      // console.log(error.response.data.message);
      setOpenBackdrop(false);
    }
  };

  return (
    <div>
      <div className={genrePlaylist.section}>
        <h4 className={genrePlaylist.left}>Playlists</h4>
        <p className={genrePlaylist.right} onClick={() => props.showHidden('playlists')}>
          view all
        </p>
      </div>
      <motion.div
        className={genrePlaylist.playlistFlex}
        initial='out'
        animate='in'
        variants={pageTransition}
        transition={transit}
      >
        {props.playlists.length ? (
          props.playlists.slice(0, 7).map((playlist) => {
            return (
              <Link to={`/playlist/${playlist._id}`} className={genrePlaylist.playlistLink} key={playlist._id}>
                <div key={playlist._id} className={genrePlaylist.playlistDiv}>
                  <img src={playlist.imgURL} className={genrePlaylist.playlistImage} alt='' />
                  <div className={genrePlaylist.playlistName}>{playlist.name}</div>
                  <div className={genrePlaylist.playlistLikes}>
                    <FcLike /> {playlist.likes.length}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={genrePlaylist.noPlaylistDiv}>
            <div className={genrePlaylist.noPlaylistCard}>
              <div>
                <IconContext.Provider value={{ color: '#2DCEEF', size: '30px' }}>
                  <BsFillPlusCircleFill onClick={openHandler} />
                </IconContext.Provider>
              </div>
              <div>Create Playlist</div>
            </div>
          </div>
        )}
      </motion.div>
      <Modal onAddPlaylist={addData} onOpen={open} onHandleClose={handleClose} />
      <CustomizedAlerts
        open={openAlert}
        alertType={alertType as 'success' | 'error'}
        alertMsg={alertMsg}
        onClose={closeAlert}
      />
      <BackdropRoller open={openBackdrop} />
    </div>
  );
};

export default GenrePlaylist;
