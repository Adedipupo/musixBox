import React, { useContext } from 'react';
import tracksTableStyles from './tracksTable.styles';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { limitSentence, secondsToHms } from '../../utils/utils';
import useMusicPlayer from '../../hooks/useMusicPlayer';
// import AddToPlaylist from '../PlaylistModal/PlaylistModal';
import { AuthContext } from '../../context/AuthContext';
import Loader from 'react-loader-spinner';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import { useRecentlyPlayed } from '../../hooks/useRecentlyPlayed';

type props = {
  tracks: any;
  img: string;
  album: string;
  albumId: string;
};

const TracksTable: React.FC<props> = ({ tracks, album, img, albumId }) => {
  const { setPlaylistModal, setSongToAdd } = useContext(AuthContext);
  const { addToRecentlyPlayed } = useRecentlyPlayed();

  const addToPlaylist = (
    track: any,
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSongToAdd({
      album,
      albumImgUrl: img,
      preview: track.preview,
      duration: +track.duration,
      title: track.title,
      id: track.id,
      artist: track.artist.name,
    });
    setPlaylistModal(true);
  };

  /**
   * This function takes in two parameters, the first being
   * the id of the song to be played and the second being
   * the array from which the song is being played.
   */
  const { handleSongClick, playing, currentSong, setQueueDetails } = useMusicPlayer();

  const classes = tracksTableStyles();

  return (
    <div className={classes.tracksWrapper}>
      <div className={classes.tracksGrid}>
        <div className={classes.title}>#</div>
        <div className={classes.title}>Title</div>
        <div className={classes.title}>Artist</div>
        <div className={classes.title}>Time</div>
        <div></div>
        <div></div>
      </div>
      {tracks &&
        tracks.map((track: any, idx: number) => (
          <div
            onClick={() => {
              handleSongClick(track.id, tracks);
              addToRecentlyPlayed('album', albumId);
              setQueueDetails({
                title: album,
                source: 'album',
                cover: img,
              });
            }}
            className={clsx(
              classes.tracksGrid,
              classes.showOnHover,
              classes.trackTxt,
              currentSong && currentSong.id === track.id && classes.currentSong
            )}
            key={track.id}
          >
            {playing && currentSong && currentSong.id === track.id && classes.currentSong && (
              <div className={classes.isPlayingIcon}>
                <Loader type='Bars' color='#2DCEEF' height={15} width={15} />
              </div>
            )}
            {currentSong && currentSong.id === track.id && (
              <div className={classes.playerIcon}>
                {playing ? (
                  <PauseCircleOutlineOutlinedIcon style={{ fontSize: 13 }} />
                ) : (
                  <PlayCircleOutlineOutlinedIcon style={{ fontSize: 13 }} />
                )}
              </div>
            )}
            <div className={classes.track}>{idx + 1}</div>
            <div className={clsx(classes.track, classes.trackMobile)}>
              <span>{track.title && limitSentence(track.title)}</span>
              <span className={classes.durationMobile}>{secondsToHms(+track.duration)}</span>
            </div>
            <div className={clsx(classes.track, classes.hideMobile)}>{track.artist && track.artist.name} </div>
            <div className={clsx(classes.track, classes.hideMobile)}>{secondsToHms(+track.duration)}</div>
            <div className={clsx(classes.trackIcon, classes.hideMobile)}>
              {/* <FavoriteBorderIcon className={classes.trackBtn} /> */}
            </div>
            <div className={clsx(classes.trackIcon, classes.hideMobile)} onClick={(e) => addToPlaylist(track, e)}>
              <AddIcon style={{ fontSize: 14 }} className={classes.trackBtn} />
            </div>
            <IconButton className={classes.moreIcon}>
              <AddIcon className={classes.moreIcon} onClick={(e) => addToPlaylist(track, e)} />
            </IconButton>
          </div>
        ))}

      {/* <AddToPlaylist /> */}
    </div>
  );
};

export default TracksTable;
