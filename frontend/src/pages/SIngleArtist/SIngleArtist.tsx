import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import artistStyles from './SIngleArtist.module.css';
import { RiMoreLine } from 'react-icons/ri';
import ArtistAlbums from '../../components/ArtistAlbums/ArtistAlbums';
import ArtistPopularSongs from '../../components/ArtistPopularSongs/ArtistPopularSongs';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { MdFavoriteBorder } from 'react-icons/md';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import Loader from '../../ui/Loader/Loader';
import { useRecentlyPlayed } from '../../hooks/useRecentlyPlayed';

const SIngleArtist = () => {
  const ctx = useContext(AuthContext);
  const { token, data: userId } = ctx.user;
  const { setArtistName } = ctx;
  const [artist, setArtist] = useState<any>(null);
  const [like, setLike] = useState(false);
  const { handleSongClick, setQueueDetails, currentSong } = useMusicPlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [artistMongoId, setArtistMongoId] = useState('');
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    try {
      const fetchArtist = async () => {
        setIsLoading(true);
        try {
          const {
            data: { data },
          } = await axios.get(`https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const hasBeenLiked = data.artist.likedBy.includes(userId._id);
          if (hasBeenLiked) {
            setLike(true);
          }
          setArtistName(`${data.artist.name}-${data.artist.id}`);
          setArtistMongoId(data.artist._id);
          setArtist(data);
          setIsLoading(false);
        } catch (e) {
          // console.log(e, 'ERROR');
          setIsLoading(false);
        }
      };
      try {
        fetchArtist();
      } catch (e) {
        setIsLoading(false);
        setError(e.response);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [id, setArtistName, token, userId._id]);

  const shuffleTracks = () => {
    // generate random number based on the number of tracks
    let randomNo = Math.floor(Math.random() * (artist.songs.length - 1));

    // if random track is the current song playing, change the track
    if (currentSong && currentSong.id === artist.songs[randomNo].id) {
      randomNo === artist.songs.length ? (randomNo = 0) : randomNo++;
    }

    // play song
    handleSongClick(artist.songs[randomNo].id, artist.songs);
    addToRecentlyPlayed('artist', artist.artistId);
    setQueueDetails({
      title: artist.artist.name,
      source: 'Popular Songs',
      cover: artist?.artist?.picture,
    });
  };

  const likeArtist = async () => {
    setLike(!like);
    try {
      await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      // console.log(e.response, 'ERROR');
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && artist && (
        <motion.div initial='out' animate='in' exit='out' variants={pageTransition} transition={transit}>
          <div className={artistStyles.artistBody}>
            <div className={artistStyles.mobileIcons}>
              <div>
                <ArrowBackIcon />
              </div>
              <div className={artistStyles.right}>
                <ShareIcon />
                <MoreVertIcon />
              </div>
            </div>
            <div className={artistStyles.artistGrid}>
              <div className={artistStyles.artistFlex}>
                <div>
                  <img src={artist?.artist?.picture} className={artistStyles.artistImage} alt='' />
                </div>
                <div className={artistStyles.artistDets}>
                  <p className={artistStyles.artistTitle}>Artist</p>
                  <div className={artistStyles.artistName}>{artist?.artist?.name}</div>
                  <div className={artistStyles.buttons}>
                    <button
                      className={artistStyles.followButton}
                      onClick={() => {
                        likeArtist();
                      }}
                      style={{ color: like ? 'red' : 'white', borderColor: like ? 'red' : 'white' }}
                    >
                      <span>
                        <FavoriteBorderIcon style={{ fontSize: 'medium', fill: like ? 'red' : 'white' }} />
                      </span>{' '}
                      <span>Like</span>
                    </button>
                    <button className={artistStyles.shuffleButton2} onClick={shuffleTracks}>
                      <ShuffleIcon style={{ fontSize: 'medium' }} /> shuffle play
                    </button>
                  </div>
                </div>
              </div>
              <div className={artistStyles.right}>
                <button className={artistStyles.shuffleButton} onClick={shuffleTracks}>
                  shuffle play
                </button>
                <span
                  className={artistStyles.icons}
                  onClick={() => {
                    likeArtist();
                  }}
                >
                  <MdFavoriteBorder style={{ fill: like ? 'red' : 'white', borderColor: like ? 'red' : 'white' }} />
                </span>
                <span className={artistStyles.icons}>
                  <RiMoreLine />
                </span>
              </div>
            </div>
            <ArtistPopularSongs artist={artist} isLoading={isLoading} error={error} artistId={artistMongoId} />
            <ArtistAlbums artist={artist} />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SIngleArtist;
