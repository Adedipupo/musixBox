import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import albumClass from './ShowAllAlbum.module.scss';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../ui/Loader/Loader';

interface Recent {
  ownerId: string;
  title: string;
  id: string;
  cover_medium: string;
  directory_info: {
    title: string;
    name: string;
    likedCount: number;
    likeCount: number;
    likesCount: number;
    picture_medium: string;
    cover_medium: string;
  };
}
interface LocationState {
  album: Recent[];
}
export default function ShowAllAlbum() {
  const location = useLocation<LocationState>();
  const { user } = useContext(AuthContext);
  const [allAlbum, setAllAlbum] = useState<Recent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const { id } = useParams<{ id: string }>();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllAlbum = async () => {
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
      const album = data[0].album.map((item: Record<string, any>) => item);
      setAllAlbum(album);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      setAllAlbum(location.state.album);
      setIsLoading(false);
    } else {
      fetchAllAlbum();
    }
  }, [fetchAllAlbum, location.state]);
  return (
    <div style={{ paddingBottom: 240 }}>
      {isLoading && <Loader />}
      {!isLoading && allAlbum && (
        <div className={albumClass.allAlbum}>
          {allAlbum.map((item: Recent) => (
            <Link to={`/album/${item.id}`} className={albumClass.Nav_link} key={item.id}>
              <div className={albumClass.album_img} key={item.id}>
                <img className={albumClass.imgs || ash_sm} src={item.cover_medium} alt='album img'></img>
                <div className={albumClass.title}>{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
