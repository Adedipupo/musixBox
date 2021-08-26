import React from 'react';
import popularSongs from './ArtistPopularSongs.module.css';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useMusicPlayer from '../../hooks/useMusicPlayer';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
// import AddToPlaylist from '../PlaylistModal/PlaylistModal';
import Loader from '../../ui/Loader/Loader';
import { limitSentence } from '../../utils/utils';
import clsx from 'clsx';
import Loaders from 'react-loader-spinner';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import { useRecentlyPlayed } from '../../hooks/useRecentlyPlayed';

interface Props {
  isLoading: boolean;
  error: string;
  artistId: string;
  artist: any;
}

const getTimeFormat = (sec: number): string => {
  const date = new Date(0);
  date.setSeconds(sec);
  const timeString = date.toISOString().substr(14, 5);
  return timeString;
};

const ArtistPopularSongs: React.FC<Props> = (props) => {
  const { setPlaylistModal, setSongToAdd } = useContext(AuthContext);
  const { handleSongClick, currentSong, playing, setQueueTitle, setQueueDetails } = useMusicPlayer();
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  const addToPlaylist = (track: any, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setSongToAdd({
      album: track.album.title,
      albumImgUrl: track.album.cover_small,
      preview: track.preview,
      duration: +track.duration,
      title: track.title,
      id: track.id,
      artist: track.artist.name,
    });
    setPlaylistModal(true);
  };

  return (
    <div className={popularSongs.popularBody}>
      {props.error && <h1>An error occurred, pls try again...</h1>}
      {props.isLoading && (
        <div className={popularSongs.popularLoader}>
          <Loader />
        </div>
      )}
      {props.artist.songs && props.artist.songs.length !== 0 && !props.isLoading && (
        <>
          <div className={popularSongs.grid}>
            <div>
              <p>Popular songs</p>
            </div>
            <div className={popularSongs.right}>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <table className={popularSongs.popularTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th></th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {props.artist.songs.map((track: any, index: any) => (
                <tr
                  className={clsx(
                    popularSongs.currentSong,
                    currentSong && currentSong.id === track.id && popularSongs.currentSongBg
                  )}
                  key={track.id}
                  onClick={() => {
                    handleSongClick(track.id, props.artist.songs);
                    addToRecentlyPlayed('artist', props.artistId);
                    setQueueTitle(props.artist.name);
                    setQueueDetails({
                      title: track.artist.name,
                      source: 'Popular Songs',
                      cover: props.artist?.artist?.picture,
                    });
                  }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <span className={popularSongs.singleGenreCard}>
                      <img src={track.album.cover_small} alt='' />
                    </span>
                    <span>{track.title}</span>
                  </td>
                  <td>{track.artist.name}</td>
                  <td>{limitSentence(track.album.title)}</td>
                  <td>
                    <div className={popularSongs.iconContainer}>
                      {currentSong && currentSong.id === track.id && (
                        <div className={popularSongs.playerIcon}>
                          {playing ? (
                            <PauseCircleOutlineOutlinedIcon style={{ fontSize: 12 }} />
                          ) : (
                            <PlayCircleOutlineOutlinedIcon style={{ fontSize: 12 }} />
                          )}
                        </div>
                      )}
                      <div className={popularSongs.isPlayingIcon}>
                        {playing && currentSong && currentSong.id === track.id && (
                          <Loaders type='Bars' color='#2DCEEF' height={10} width={10} />
                        )}
                      </div>
                    </div>
                    {/* {playing && currentSong && currentSong.id === track.id && ( */}
                    {/*
                    {/* )} */}
                  </td>
                  <td>{getTimeFormat(track.duration)}</td>
                  <td>
                    <span onClick={(e) => addToPlaylist(track, e)}>
                      <AddIcon className={popularSongs.add} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                    <span>
                      <MoreVertIcon className={popularSongs.dots} style={{ fontSize: 'medium', float: 'right' }} />
                    </span>
                  </td>
                  {/* {playing && currentSong && currentSong.id === track.id && (
                    <div className={popularSongs.isPlayingIcon}>
                      <Loaders type='Bars' color='#2DCEEF' height={10} width={10} />
                    </div>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <AddToPlaylist /> */}
        </>
      )}
    </div>
  );
};

export default ArtistPopularSongs;
