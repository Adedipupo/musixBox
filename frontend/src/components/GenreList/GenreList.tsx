import React, { useState, useEffect, useContext } from 'react';
import genreClass from './GenreList.module.scss';
// import hipHopImg from '../../asset/homepageImages/hipHop.png';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
interface Genre {
  id?: string;
  _id: string;
  name: string;
  picture_medium?: string;
  picture_small?: string;
}

function GenreList() {
  const { user } = useContext(AuthContext);
  const [genre, setGenre] = useState([] as Genre[]);
  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/genres';
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const {
          data: { data: response },
        } = await axios.get(url, config);
        setGenre(response);
      } catch (error) {
        // console.log(error.message);
      }
    };
    getAllGenres();
  }, [user.token]);

  return (
    <motion.div
      className={genreClass.flez}
      initial='out'
      animate='in'
      exit='out'
      variants={pageTransition}
      transition={transit}
    >
      {genre.map((items) => (
        <div
          key={items.id}
          onClick={() => {
            history.push(`/genres/${items.id}/${items._id}`);
          }}
          className={genreClass.genreImg}
          style={{ backgroundImage: `url(${items.picture_medium})` }}
        >
          <div className={genreClass.overlay}></div>
          <h3>{items.name}</h3>
        </div>
      ))}
    </motion.div>
  );
}
export default GenreList;
