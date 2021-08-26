import React from 'react';
import AllPlaylistStyles from './AllPlaylists.module.css';
import { FcLike } from 'react-icons/fc';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import { Link } from 'react-router-dom';

interface Props {
  playlists: any[];
}

const AllPlaylists: React.FC<Props> = (props) => {
  return (
    <motion.div initial='out' animate='in' variants={pageTransition} transition={transit}>
      <div className={AllPlaylistStyles.section}>
        <h4 className={AllPlaylistStyles.left}>Playlists</h4>
      </div>
      <div className={AllPlaylistStyles.playlistFlex}>
        {props.playlists.length ? (
          props.playlists.map((playlist) => {
            return (
              <Link to={`/playlist/${playlist._id}`} className={AllPlaylistStyles.playlistLink}>
                <div key={playlist._id} className={AllPlaylistStyles.playlistDiv}>
                  <div key={playlist._id} className={AllPlaylistStyles.playlistDiv}>
                    <img src={playlist.imgURL} className={AllPlaylistStyles.playlistImage} alt='' />
                    <div className={AllPlaylistStyles.playlistName}>{playlist.name}</div>
                    <div className={AllPlaylistStyles.playlistLikes}>
                      <FcLike /> {playlist.likesCount}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className={AllPlaylistStyles.noPlaylistDiv}>
            <div className={AllPlaylistStyles.noPlaylistCard}>
              <div className={AllPlaylistStyles.noPlaylistPlus}>
                <IconContext.Provider value={{ color: '#2DCEEF', size: '30px' }}>
                  <BsFillPlusCircleFill />
                </IconContext.Provider>
              </div>
              <div>Create Playlist</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllPlaylists;
