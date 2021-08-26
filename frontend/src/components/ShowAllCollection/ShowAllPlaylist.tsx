import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import albumClass from './ShowAllAlbum.module.scss';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import axios from 'axios';
import Loader from '../../ui/Loader/Loader';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

interface Recent {
  ownerId: Record<string, any>;
  title: string;
  _id: string;
  cover_medium: string;
  name: string;
  directory_info: {
    title: string;
    likedCount: number;
    likeCount: number;
    likesCount: number;
    picture_medium: string;
    cover_medium: string;
  };
  imgURL: string;
  likesCount: number;
}
interface LocationState {
  playlist: Recent[];
}
const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';
export default function ShowAllAlbum() {
  const ctx = useContext(AuthContext);
  const { _id } = ctx.user.data;
  const location = useLocation<LocationState>();
  const { user } = useContext(AuthContext);
  const [allPlaylist, setAllPlaylist] = useState<Recent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllPlaylist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { data },
      } = await axios.get(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/search/?name=${query.get('name')}`,
        config
      );
      const playlist = data[0].playlist.map((item: Record<string, any>) => item);
      setAllPlaylist(playlist);
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location.state) {
      setAllPlaylist(location.state.playlist);
      setIsLoading(false);
    } else {
      fetchAllPlaylist();
    }
  }, [fetchAllPlaylist, location.state]);
  // const { playlist } = location.state;
  return (
    <div style={{ paddingBottom: 240 }}>
      {isLoading && <Loader />}
      {!isLoading && allPlaylist && (
        <motion.div
          className={albumClass.allAlbum}
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}
          transition={transit}
        >
          {allPlaylist.map((item) => (
            <Link to={`/playlist/${item._id}`} className={albumClass.Nav_link} key={item.ownerId._id}>
              <motion.div
                className={albumClass.album_img}
                key={item.ownerId._id}
                initial='out'
                animate='in'
                exit='out'
                variants={pageTransition}
                transition={transit}
              >
                <img className={albumClass.imgs || ash_sm} src={item.imgURL || defaultImg} alt='playlist img'></img>
                <div className={albumClass.title}>{item.name}</div>
                <div className={albumClass.playlistLikes}>
                  <small className={albumClass.desc}>
                    by {item._id === _id ? 'you' : `${item.ownerId.firstName} ${item.ownerId.lastName}`}
                  </small>
                  <small className={albumClass.desc}>
                    {item.likesCount > 1 ? item.likesCount + ' likes' : item.likesCount + ' like'}
                  </small>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
