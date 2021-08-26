/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import singleGenreStyles from './SingleGenre.module.css';
import GenreArtist from '../../components/GenreArtist/GenreArtist';
import AllArtists from '../../components/AllArtists/AllArtists';
import AllPlaylists from '../../components/AllPlaylists/AllPlaylists';
import GenrePlaylist from '../../components/GenrePlaylist/GenrePlaylist';
import { RiArrowLeftLine } from 'react-icons/ri';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

interface Genre {
  genreId: number;
  id: number;
  name: string;
  picture_xl: string;
}

const SingleGenre = () => {
  const [artistes, setArtistes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [genre, setGenre] = useState({} as Genre);
  const [show, setShow] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { playlistId } = useParams<{ playlistId: string }>();
  const { genreId } = useParams<{ genreId: string }>();
  const history = useHistory();
  const { setGenreName } = useContext(AuthContext);

  const goBack = () => {
    history.push(`/genres`);
  };

  useEffect(() => {
    const fetchArtistes = async () => {
      setIsLoading(true);
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/artist/${genreId}`);
      setArtistes(data);
      setIsLoading(false);
    };
    const fetchPlaylists = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/playlist/${playlistId}`);
      setPlaylists(data);
    };
    const fetchGenre = async () => {
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/genres/${genreId}`);
      setGenre(data);
      setGenreName(`${data.name}-${data.id}/${data._id}`);
    };
    try {
      fetchArtistes();
    } catch (e) {
      setIsLoading(false);
      setError(e.response);
    }
    fetchGenre();
    fetchPlaylists();
  }, [genreId, playlistId, setGenreName]);
  const showHidden = (category: string) => {
    setShow(category);
  };
  return (
    <div className={singleGenreStyles.singleGenreBody}>
      {/* <div className={singleGenreStyles.singleGenreBackground} style={{ background: `url(${genre.picture_xl})no-repeat 100% 100%/cover`, position: "absolute", top: 0, left: 0, width: "100%", backdropFilter: "blur(10px)" }}>
        <div style={{height: "100%", width:"100%", background: "rgba(0, 0, 0, .2)", backdropFilter: "blur(10px)"}}></div>
    </div> */}
      {/* <div className={singleGenreStyles.overlay} /> */}

      <div className={singleGenreStyles.back} onClick={goBack}>
        <RiArrowLeftLine /> Back
      </div>
      <div className={singleGenreStyles.nav}>
        <div className={singleGenreStyles.navGenre}>{genre.name}</div>
        <div className={singleGenreStyles.innerNav}>
          <div className={singleGenreStyles.navItem} onClick={() => showHidden('overview')}>
            <a className={singleGenreStyles.link}>overview</a>
          </div>
          <div className={singleGenreStyles.navItem} onClick={() => showHidden('playlists')}>
            <a className={singleGenreStyles.link}>playlist</a>
          </div>
          <div className={singleGenreStyles.navItem} onClick={() => showHidden('artists')}>
            <a className={singleGenreStyles.link}>artists</a>
          </div>
        </div>
      </div>
      {show === 'overview' && (
        <div style={{ paddingBottom: 80 }}>
          <GenrePlaylist playlists={playlists} showHidden={showHidden} />
          <GenreArtist isLoading={isLoading} error={error} artistes={artistes} showHidden={showHidden} />
        </div>
      )}
      {show === 'artists' && <AllArtists artistes={artistes} />}
      {show === 'playlists' && <AllPlaylists playlists={playlists} />}
    </div>
  );
};

export default SingleGenre;
