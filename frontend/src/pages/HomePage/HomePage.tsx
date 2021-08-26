import React, { useRef, useEffect, useState, useContext, useCallback } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Flows from '../../components/Flow/Flow';
import classHome from './HomePage.module.scss';
import RecentlyPlayedCardRound from '../../components/Flow/RecentPlayed';
import MostPlayedArtist from '../../components/MostPlayedArtist/MostplayedArtist';
import GenreList from '../../components/GenreList/GenreList';
import MobileNav from '../../components/MobileNav/MobileNav';
import BGblue from '../../asset/homepageImages/BGblue.png';
import BGgreen from '../../asset/homepageImages/BGgreen.png';
import BG_ash from '../../asset/homepageImages/BG_ash.png';
import ash_sm from '../../asset/homepageImages/ash_sm.jpg';
import Favorite from '../../asset/homepageImages/Favorite.png';
// import MobileHompageNav from './MobileHompageNav';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CustomizedAlerts from '../../ui/Alert/Alert';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import Spinner from '../../ui/Loader/Loader';
import BackdropRoller from '../../ui/Backdrop/Backdrop';
import axios from 'axios';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import Modal from '../../ui/Modal/Modal';
import { formatTime, PLAYLISTS } from '../../pages/Library/Playlist/Playlist';
// import AddToPlayList from '../../components/PlaylistModal/PlaylistModal';
import defaultCover from '../../assets/playerbg.png';
import { MusicPlayerContext } from '../../context/MusicPlayerContext';

function Home() {
  const [open, setOpen] = React.useState(false);
  const { toggleMusicPlay, playing } = useMusicPlayer();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  // const [playlists, setPlaylists] = useState<PLAYLISTS[]>([]);
  const [mostPopularPlaylist, setMostPopularPlaylist] = useState<Partial<PLAYLISTS>>({});
  const location = useLocation();
  const { state } = location;
  const from = state ? (state as { from: string }).from : '';
  const ctx = useContext(AuthContext);
  const songCtx = useContext(MusicPlayerContext);
  const { firstName } = ctx.user.data;
  const [spinLoader, setSpinLoader] = useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const { token } = ctx.user;
  const { _id } = ctx.user.data;
  const history = useHistory();
  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';

  const overviewRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const mostPlayedRef = useRef<HTMLDivElement>(null);
  const executeScroll = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current ? ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' }) : null;

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const fetchData = useCallback(async () => {
    const loadData = [];

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${URL}/playlist/mostLiked`, config);

    const { payload } = await response.data.data;

    for (const key in payload) {
      const owner = payload[key].ownerId._id === _id;
      const desc =
        payload[key].tracks.length > 1 ? payload[key].tracks.length + ' songs ' : payload[key].tracks.length + ' song ';
      loadData.push({
        id: payload[key]._id,
        desc: desc + ' ' + formatTime(payload[key].tracks),
        name: payload[key].name,
        updatedAt: payload[key].updatedAt,
        type: owner ? 'owner' : 'liked',
        image: payload[key].imgURL,
        noOfTracks: !!payload[key].tracks.length,
        owner: owner,
        likes: payload[key].likesCount,
      });
    }
    const mostPopular = loadData[0];
    setMostPopularPlaylist(mostPopular);
    // setPlaylists(loadData);
  }, [_id, token]);

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
      history.push('/library');
    } catch (error) {
      console.log(error.response.data.message);
      setOpenBackdrop(false);
    }
  };

  const first = 'linear-gradient(45deg, rgb(179,187,200) 50%, rgb(123, 128, 137) 5%)';
  const second = 'linear-gradient(45deg, rgb(101,177,242) 50%, rgb(82, 124, 160) 5%)';
  const third = 'linear-gradient(45deg, rgb(105,234,211) 50%, rgb(94, 157, 106) 5%)';
  const openPlaylistModal = () => {
    setOpen(true);
  };

  const handleClick = () => {
    //
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const prev = localStorage.getItem('prevRoute');
    if ((from && from === 'login') || prev === 'login') {
      setAlertMsg(`welcome ${firstName}`);
      setAlertType('success');
      setOpenAlert(true);
      localStorage.removeItem('prevRoute');
      setSpinLoader(false);
    } else {
      setOpenAlert(false);
      setSpinLoader(false);
    }
  }, [from, firstName]);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {/* <AddToPlayList /> */}
      {spinLoader && <Spinner />}
      {!spinLoader && (
        <motion.div
          initial='out'
          animate='in'
          exit='out'
          variants={pageTransition}
          transition={transit}
          style={{ paddingBottom: 70 }}
        >
          <div ref={overviewRef} className={classHome.home_div}>
            <div className={classHome.titles}>
              <h4>Flow</h4>
              <h1 className={classHome.hidenHome}>Home</h1>
              <i className='fas fa-ellipsis-h'></i>
            </div>
            <div>
              <div className={classHome.mobile_route}>
                <NavLink activeClassName={classHome.active} to='#/' onClick={() => executeScroll(overviewRef)} exact>
                  OVERVIEW
                </NavLink>
                <NavLink activeClassName={classHome.currentPOS} to='#/' onClick={() => executeScroll(genreRef)} exact>
                  GENRE AND MOOD
                </NavLink>
                <NavLink
                  activeClassName={classHome.currentPOS}
                  to='#/'
                  onClick={() => executeScroll(mostPlayedRef)}
                  exact
                >
                  MOST PLAYED ARTIST
                </NavLink>
              </div>
            </div>
            {/* <div className={classHome.activePOS}></div> */}
            <div className={classHome.mobile_nav}>
              <MobileNav />
            </div>

            <div className={classHome.home_card}>
              <Flows
                name='control-player'
                playing={playing}
                clickHandle={toggleMusicPlay}
                image={songCtx.queueDetails.cover || defaultCover || ash_sm}
                playIcon='fas fa-play'
                pauseIcon='fas fa-pause'
                bgImg={BG_ash}
                grad={first}
                color={'#b2c5e8'}
                title='Control'
                description='Song currently playing will appear here'
              />
              <Flows
                name='create-playlist'
                title='Create'
                description='Create your personal playlist here'
                playing={playing}
                clickHandle={openPlaylistModal}
                image={BGblue}
                playIcon='fas fa-plus'
                bgImg={BGblue}
                grad={second}
                color={'#9369ef'}
              />
              <Flows
                name='popular-playlist'
                title='Popular'
                description={mostPopularPlaylist.name || ''}
                playing={playing}
                clickHandle={handleClick}
                image={mostPopularPlaylist.image || Favorite}
                playIcon='fas fa-music'
                bgImg={BGgreen}
                grad={third}
                color={'#6ad462'}
                id={mostPopularPlaylist.id}
              />
              {/* <Flows />  */}
            </div>
            <div className={classHome.played_recent}>
              <h4>Recently Played</h4>
            </div>
            <div className={classHome.recent_played}>
              <RecentlyPlayedCardRound />
            </div>
            <div ref={genreRef} className={classHome.genre_div}>
              <div className={classHome.played_recent}>
                <h4>Browse Genres</h4>
                <p className={classHome.genre_P}>Browse by genre and mood</p>
              </div>
              <GenreList />
            </div>
            <div className={classHome.played_recent}>
              <h4>Artist you may like</h4>
            </div>
            <div ref={mostPlayedRef} className={classHome.mostPlayed_artist}>
              <MostPlayedArtist />
            </div>
            <CustomizedAlerts
              alertMsg={alertMsg}
              alertType={alertType as 'success' | 'error'}
              open={openAlert}
              onClose={closeAlert}
            />
            <Modal onAddPlaylist={addData} onOpen={open} onHandleClose={handleClose} />
            <BackdropRoller open={openBackdrop} />
          </div>
        </motion.div>
      )}
    </React.Fragment>
  );
}

export default Home;
