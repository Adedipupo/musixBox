import mostPlayedClass from '../Flow/Played.module.scss';
// import NatureImg from '../../asset/homepageImages/Nature.png';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

interface Recent {
  id: string;
  name: string;
  listeningCount: number;
  likedCount?: number;
  picture_medium: string;
}

function MostPlayedArtist() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // set state for resently played
  const [mostPlayed, setMostPlayed] = useState([] as Recent[]);

  const url = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // getRecentlyPlayedPlaylist()

  useEffect(() => {
    const getMostPlayedArtist = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {
          data: { data: response },
        } = await axios.get(`${url}/artist/mostPlayed`, config);

        setMostPlayed(response.payload);
      } catch (error) {
        // console.log(error.message);
      }
    };
    getMostPlayedArtist();
  }, [user.token]);

  return (
    <div className={mostPlayedClass.parent_div}>
      {mostPlayed.slice(1, 9).map((item) => (
        <div className={mostPlayedClass.rounded} key={item.id} onClick={() => history.push(`/artist/${item.id}`)}>
          <div className={mostPlayedClass.Sm_cardRound}>
            <img style={{ background: 'rgba(255, 255, 255, .1)' }} src={item.picture_medium} alt='pc' />
          </div>
          <div className={mostPlayedClass.like}>
            <p>{item.name}</p>
            <i className='fas fa-heart'>
              {' '}
              <span>{item.likedCount}</span>
            </i>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MostPlayedArtist;
