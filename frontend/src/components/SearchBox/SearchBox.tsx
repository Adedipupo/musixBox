import React, { useEffect, useState, ChangeEvent, FormEvent, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import SearchClass from '../Navbar/Navbar.module.scss';
import { Form, FormControl } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
// import './Dropdown.css';
import NoResult from '../NoResult/NoResult';
import Loader from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import debounce from 'lodash.debounce';

interface Props {}
interface Typing {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  cover_small: string;
  picture_small: string;
  artist: {
    name: string;
    picture_small: string;
  };
  imgURL?: string;
}
const defaultImg =
  'https://cdns-images.dzcdn.net/images/artist/726daf1256ee5bd50f222c5e463fe7ae/56x56-000000-80-0-0.jpg';

function SearchInputBox(this: any, props: Props) {
  // state for search album playlist Artist
  const [search, setSearch] = useState('');
  const [album, setAlbum] = useState([] as Typing[]);
  const [artist, setArtist] = useState([] as Typing[]);
  const [playlist, setPlaylist] = useState([] as Typing[]);
  const [show, setShow] = useState(false);
  const [hideSearch, setHideSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const [display, setDisplay] = useState(false);

  // useref object
  const container = useRef<HTMLDivElement>(null);
  const { user } = useContext(AuthContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      setAlbum([]);
      setArtist([]);
      setPlaylist([]);
    }
  }
  function Handlefetch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchAll();
  }
  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {
        data: { data },
      } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/search/?name=${search}`, config);
      const album = data[0].album.map((items: Record<string, any>) => items);
      const artist = data[0].artist.map((items: Record<string, any>) => items);
      const playlist = data[0].playlist.map((items: Record<string, any>) => items);

      if (album.length === 0 && artist.length === 0 && playlist.length === 0) {
        setShow(true);
      } else {
        setAlbum(album);
        setArtist(artist);
        setPlaylist(playlist);
        setHideSearch(false);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  const changeSearch = debounce(Handlefetch, 1000);

  function handleClickOutside(event: { target: any }) {
    // event.preventDefault()
    if (container.current?.contains(event.target)) {
      return;
    }
    setAlbum([]);
    setArtist([]);
    setPlaylist([]);
    setSearch('');
    event.target.value = '';
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={SearchClass.searchBox}>
      <Form
        onChange={changeSearch}
        className={SearchClass.searchform}
        style={{ position: 'relative', width: 'max-content' }}
        onSubmit={Handlefetch}
      >
        <FormControl
          type='search'
          placeholder='Search'
          className={SearchClass.search_btn}
          aria-label='Search'
          onChange={handleChange}
          style={{
            borderRadius: '40px',
            color: 'white',
            paddingLeft: '40px',
            width: '250px',
            height: '30px',
            backgroundColor: '#3a3b3e',
            borderStyle: 'none',
          }}
        />
        {isLoading && (
          <div className={SearchClass.barLoader}>
            <Loader type='Bars' color='#2DCEEF' height={20} width={20} />
          </div>
        )}
        {!hideSearch && (
          <motion.div
            className={SearchClass.ul_div}
            ref={container}
            onClick={() => setHideSearch(true)}
            initial='out'
            animate='in'
            exit='out'
            variants={pageTransition}
            transition={transit}
          >
            <ul className={SearchClass.ul_list}>
              <div className={SearchClass.searchTitle}>
                {artist.length !== 0 && (
                  <>
                    <p>Artist</p>
                    <p>
                      <Link
                        to={{ pathname: `/allArtist?name=${search}`, state: { artist: artist } }}
                        className={SearchClass.views}
                      >
                        View all
                      </Link>
                    </p>
                  </>
                )}
              </div>
              {artist && artist ? (
                artist.slice(0, 3).map((item: Typing) => (
                  <NavLink className={SearchClass['Nav_link']} to={`/artist/${item.id}`} key={item.id}>
                    <li key={item.id}>
                      <div className={SearchClass.searchDetails}>
                        <img className={SearchClass.imgs} src={item.picture_small || defaultImg} alt='artist img'></img>
                        <div className={SearchClass.searchTest}>{item.name}</div>
                      </div>
                    </li>
                  </NavLink>
                ))
              ) : (
                <></>
              )}
            </ul>
            <ul className={SearchClass.ul_list}>
              <div className={SearchClass.searchTitle}>
                {album.length !== 0 && (
                  <>
                    <p>Album</p>
                    <p>
                      <NavLink
                        to={{ pathname: `/allAlbum?name=${search}`, state: { album: album } }}
                        className={SearchClass.views}
                      >
                        View all
                      </NavLink>
                    </p>
                  </>
                )}
              </div>
              {album && album ? (
                album.slice(0, 3).map((item: Typing) => (
                  <NavLink className={SearchClass['Nav_link']} to={`/album/${item.id}`} key={item.id}>
                    <li key={item.id}>
                      <div className={SearchClass.searchDetails}>
                        <img className={SearchClass.imgS} src={item.cover_small || defaultImg} alt='artist img'></img>
                        <span>
                          <div className={SearchClass.searchTest}>{item.title}</div>
                          <div className={SearchClass.artistName}>{item.artist.name}</div>
                        </span>
                      </div>
                    </li>
                  </NavLink>
                ))
              ) : (
                <></>
              )}
            </ul>
            {/* <div> */}

            <ul className={SearchClass.ul_list}>
              <div className={SearchClass.searchTitle}>
                {playlist.length !== 0 && (
                  <>
                    <p>Playlist</p>
                    <p>
                      <NavLink
                        to={{ pathname: `/allPlaylist?name=${search}`, state: { playlist: playlist } }}
                        className={`${SearchClass.views} ${SearchClass['Nav_link']}`}
                      >
                        View all
                      </NavLink>
                    </p>
                  </>
                )}
              </div>
              {playlist && playlist ? (
                playlist.slice(0, 4).map((item: Typing) => (
                  <NavLink className={SearchClass['Nav_link']} to={`/playlist/${item._id}`} key={item.id}>
                    <li key={item._id}>
                      <div className={SearchClass.searchDetails}>
                        <img className={SearchClass.imgS} src={item.imgURL || defaultImg} alt='playlist img'></img>
                        <div className={SearchClass.searchTest}>{item.name}</div>
                      </div>
                    </li>
                  </NavLink>
                ))
              ) : (
                <></>
              )}
            </ul>
          </motion.div>
        )}
        <i
          id={SearchClass.fa_search}
          style={{
            position: 'absolute',
            left: '10px',
            top: '6px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '50%',
            fontSize: '20px',
            color: '#fff',
          }}
          className='fa fa-search'
        ></i>
      </Form>
      <NoResult show={show} setShow={setShow} />
    </div>
  );
}

export default SearchInputBox;
