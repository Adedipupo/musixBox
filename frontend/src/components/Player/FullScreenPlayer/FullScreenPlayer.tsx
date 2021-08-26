import React, { useState } from 'react';
import Slider from '../Slider/Slider';
import { SongCard } from '../Queue/Queue';
import Tooltip from '../../../ui/Tooltip/Tooltip';
import {
  MdKeyboardArrowDown,
  MdFavoriteBorder,
  MdAdd,
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdRepeat,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { BiShuffle } from 'react-icons/bi';

import { AiOutlineMenuUnfold, AiOutlineEllipsis } from 'react-icons/ai';

import defaultCover from '../../../assets/playerbg.png';
import styles from './FullScreenPlayer.module.scss';
import useMusicPlayer from '../../../hooks/useMusicPlayer';
interface Props {
  value?: number;
  playNext: () => void;
  playPrev: () => void;
  toggleRepeat: () => void;
  repeat: boolean;
  handleVolumeChange: (value: number) => void;
  show: boolean;
  toggleShow: () => void;
  progress: number;
  handleProgress: () => void;
  currentTime: string;
  duration: string;
  onScrub: (value: number) => void;
  shuffle: boolean;
  handleShuffle: () => void;
  likedSongs: number[];
  likeClick: () => void;
  addToPlaylist: (e: any) => void;
}

const FullScreenPlayer = (props: Props) => {
  React.useLayoutEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    return () =>
      window.removeEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
  }, []);
  const [showQueue, setShowQueue] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [activeTitle, setActiveTitle] = useState('');
  const [inactiveTitle, setInactiveTitle] = useState('');

  const handleTooltipOpen = () => {
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  };
  // const location = useLocation();
  // const source = location.pathname.split('/')[1].toLocaleUpperCase();
  const { playing, toggleMusicPlay, audio, currentSong, currentSongArray, trackIndex, queueDetails } = useMusicPlayer();

  React.useEffect(() => {
    if (props.show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [props.show]);
  return (
    <div className={props.show ? styles.Wrapper : [styles.Wrapper, styles.hide].join(' ')}>
      <div className={showQueue ? [styles.main, styles.moveLeft].join(' ') : styles.main}>
        <div className={styles.Tooltip}>
          <Tooltip
            handleTooltipOpen={handleTooltipOpen}
            open={open}
            active={props.repeat || props.shuffle}
            activeTitle={activeTitle}
            inactiveTitle={inactiveTitle}
          ></Tooltip>
        </div>
        <div className={styles.top} style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
          <span className={styles.arrowDown} onClick={props.toggleShow}>
            <MdKeyboardArrowDown />
          </span>
          <div className={styles.queueTitle}>
            <h3>{queueDetails.source}</h3>
            <h2>{queueDetails.title}</h2>
          </div>
          <img src={defaultCover} alt='' />
          <div className={styles.info}>
            <h3>{currentSong?.title}</h3>
            <h4>{currentSong?.artist?.name}</h4>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.bottom}>
            <div className={styles.icons}>
              <MdAdd onClick={props.addToPlaylist} />
              <MdFavoriteBorder
                fill={currentSong && props.likedSongs.includes(currentSong.id) ? 'red' : 'white'}
                onClick={props.likeClick}
              />
              <AiOutlineEllipsis style={{ transform: 'rotate(90deg)' }} />
            </div>
            <div className={[styles.slider, 'slider'].join(' ')}>
              <Slider onScrub={props.onScrub} value={props.progress} handleChange={props.onScrub} />
              <div className={styles.time}>
                <span>{props.currentTime}</span>
                <span>{props.duration}</span>
              </div>
            </div>
            <div className={styles.btns}>
              <BiShuffle
                onClick={() => {
                  props.handleShuffle();
                  handleTooltipOpen();
                  setActiveTitle('Shuffle is on');
                  setInactiveTitle('Shuffle is off');
                }}
                style={{ color: props.shuffle ? '#2dceef' : '' }}
              />
              <MdSkipPrevious className={styles.big} onClick={props.playPrev} />
              {!playing ? (
                <MdPlayArrow className={styles.big} onClick={toggleMusicPlay} />
              ) : (
                <MdPause className={styles.big} onClick={toggleMusicPlay} />
              )}
              <MdSkipNext className={styles.big} onClick={props.playNext} />
              <MdRepeat
                onClick={() => {
                  props.toggleRepeat();
                  handleTooltipOpen();
                  setActiveTitle('Song repeat is on');
                  setInactiveTitle('Song repeat is off');
                }}
                style={{ color: props.repeat ? '#2dceef' : '' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '30px', width: '100%', marginBottom: 70 }}>
            <Slider isVolume value={audio.current?.volume} handleChange={props.handleVolumeChange} />
          </div>
        </div>
        <div className={showQueue ? [styles.NextQueue, styles.showQueue].join(' ') : styles.NextQueue}>
          <div className={styles.NextUp} onClick={() => setShowQueue(!showQueue)}>
            <AiOutlineMenuUnfold style={{ height: 30, width: 30, marginRight: 10 }} />
            <div className={styles.title}>
              <span>
                Next Up: {currentSongArray[trackIndex + 1]?.artist?.name} - {currentSongArray[trackIndex + 1]?.title}
              </span>
            </div>
            {!showQueue ? (
              <MdKeyboardArrowUp style={{ height: 35, width: 35, marginLeft: 10 }} />
            ) : (
              <MdKeyboardArrowDown style={{ height: 35, width: 35, marginLeft: 10 }} />
            )}
          </div>
          <div className={styles.listItem}>
            {currentSongArray.slice(trackIndex + 1).map((song) => {
              if (song.id !== currentSong?.id)
                return (
                  <SongCard
                    key={song.id}
                    title={song!.title}
                    id={song!.id}
                    img={queueDetails.cover || defaultCover}
                    likedSongs={props.likedSongs}
                    likeClick={props.likeClick}
                    artistName={song!.artist.name}
                    duration={props.duration}
                  />
                );
              else return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
