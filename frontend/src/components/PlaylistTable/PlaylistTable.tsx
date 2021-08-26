import React, { useContext } from 'react';
import playlistTableStyles from './playlistTableStyles';
import clsx from 'clsx';
import { secondsToHms } from '../../utils/utils';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Loader from 'react-loader-spinner';
import useMusicPlayer from '../../hooks/useMusicPlayer';
// import AddToPlaylist from '../PlaylistModal/PlaylistModal';
import { AuthContext } from '../../context/AuthContext';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import { useRecentlyPlayed } from '../../hooks/useRecentlyPlayed';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

type Props = {
  tracks: any[];
  filterTxt: string;
  isEditing: boolean;
  removeSong: (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isRemovingSong: boolean;
  userId: string;
  ownerId: string;
  playlistId: string;
  name: string;
};

const PlaylistTable: React.FC<Props> = ({
  tracks,
  filterTxt,
  isEditing,
  removeSong,
  isRemovingSong,
  userId,
  ownerId,
  playlistId,
  name,
}) => {
  const classes = playlistTableStyles();
  const [songs, setSongs] = React.useState<any | []>([]);
  const [songToRemove, setSongToRemove] = React.useState('');
  const { setPlaylistModal, setSongToAdd } = useContext(AuthContext);
  const { addToRecentlyPlayed } = useRecentlyPlayed();
  /**
   * This function takes in two parameters, the first being
   * the id of the song to be played and the second being
   * the array from which the song is being played.
   */
  const { handleSongClick, playing, currentSong, setQueueDetails } = useMusicPlayer();

  const addToPlaylist = (
    track: any,
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSongToAdd({
      album: track.album,
      albumImgUrl: track.albumImgUrl,
      preview: track.preview,
      duration: +track.duration,
      title: track.title,
      id: track.id,
      artist: track.artist,
    });
    setPlaylistModal(true);
  };

  React.useEffect(() => {
    if (filterTxt === '') {
      setSongs(tracks);
    } else {
      const newTracks: any[] = [];
      tracks.forEach((track: any) => {
        if (track.title.toLowerCase().startsWith(filterTxt.toLowerCase())) newTracks.push(track);
      });
      setSongs(newTracks);
    }
  }, [tracks, filterTxt]);

  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={pageTransition}
      transition={transit}
      className={classes.table}
    >
      <div className={clsx(classes.tableHeading, classes.hideOnMobile)}>
        <h5 className={classes.title}>#</h5>
        <div className={classes.title}></div>
        <h5 className={classes.title}>TITTLE</h5>
        <h5 className={classes.title}>ARTIST</h5>
        <h5 className={classes.title}>ALBUM</h5>
        <h5 className={classes.title}>TIME</h5>
        <div className={clsx(classes.title, classes.gridEnd)}>
          {isRemovingSong && (
            <div style={{ marginLeft: -35 }}>
              <Loader type='ThreeDots' color='#FFFFFF' height={20} width={20} />
            </div>
          )}
        </div>
      </div>
      {songs.length === 0 && filterTxt !== '' && <p className={classes.noSongs}>No results</p>}
      {songs.length === 0 && filterTxt === '' ? (
        <h3 className={classes.noSongs}>{userId === ownerId && <span>click on "edit" to add songs.</span>}</h3>
      ) : (
        songs.map((track: any, idx: number) => (
          <motion.div
            initial='out'
            animate='in'
            exit='out'
            variants={pageTransition}
            transition={transit}
            onClick={() => {
              handleSongClick(track.id, songs);
              addToRecentlyPlayed('playlist', playlistId);
              setQueueDetails({
                title: name,
                source: 'Playlist',
                cover: track.albumImgUrl,
              });
            }}
            className={clsx(
              classes.tableHeading,
              classes.showOnHover,
              currentSong && currentSong.id === track.id && classes.currentSong
            )}
            key={track._id}
          >
            {playing && currentSong && currentSong.id === track.id && classes.currentSong && (
              <div className={classes.isPlayingIcon}>
                <Loader type='Bars' color='#2DCEEF' height={15} width={15} />
              </div>
            )}
            {currentSong && currentSong.id === track.id && (
              <div className={classes.playerIcon}>
                {playing ? (
                  <PauseCircleOutlineOutlinedIcon style={{ fontSize: 14 }} />
                ) : (
                  <PlayCircleOutlineOutlinedIcon style={{ fontSize: 14 }} />
                )}
              </div>
            )}
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>{idx + 1}</h5>
            <div className={clsx(classes.contentTxt, classes.gridImg)}>
              <img className={classes.trackCover} src={track.albumImgUrl} alt='track cover' />
            </div>
            <h5 className={clsx(classes.contentTxt, classes.nameMobile)}>
              <span>{track.title}</span>
              <span className={classes.spanMobile}>
                {track.artist} / {secondsToHms(+track.duration)}
              </span>
            </h5>
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>{track.artist}</h5>
            <h5 className={clsx(classes.contentTxt, classes.hideOnMobile)}>{track.album}</h5>
            <h5 className={clsx(classes.contentTxt, classes.contentOpacity, classes.hideOnMobile)}>
              {secondsToHms(+track.duration)}
            </h5>
            <div className={clsx(classes.contentTxt, classes.gridEnd)}>
              {isEditing ? (
                <IconButton
                  onClick={(e) => {
                    setSongToRemove(track.id);
                    removeSong(track.id, e);
                  }}
                  style={{ color: '#FFFFFF' }}
                >
                  <DeleteForeverOutlinedIcon className={classes.deleteIcon} />
                </IconButton>
              ) : (
                <IconButton style={{ color: '#FFFFFF' }}>
                  {songToRemove === track.id ? (
                    <Loader type='ThreeDots' color='#FFFFFF' height={20} width={20} />
                  ) : (
                    <AddIcon className={classes.addIcon} onClick={(e) => addToPlaylist(track, e)} />
                  )}
                </IconButton>
              )}
            </div>
          </motion.div>
        ))
      )}
      {/* <AddToPlaylist /> */}
    </motion.div>
  );
};

export default PlaylistTable;
