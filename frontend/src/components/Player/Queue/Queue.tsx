import React from 'react';
import styles from './Queue.module.scss';
import { MdClose, MdFavoriteBorder } from 'react-icons/md';
import { AiOutlineEllipsis } from 'react-icons/ai';
import defaultCover from '../../../assets/playerbg.png';
import useMusicPlayer from '../../../hooks/useMusicPlayer';
interface Props {
  close: () => void;
  shuffle: boolean;
  handleShuffle: () => void;
  likeClick: () => void;
  likedSongs: number[];
}

export const SongCard = ({
  color,
  title,
  duration,
  artistName,
  id,
  likeClick,
  likedSongs,
  img,
}: {
  id?: number;
  color?: string;
  title?: string;
  duration?: string;
  artistName?: string;
  likeClick: () => void;
  likedSongs: number[];
  img: string;
}) => {
  const { handleSongClick, currentSongArray } = useMusicPlayer();
  return (
    <div className={styles.SongCard}>
      <div
        className={styles.songInfo}
        onClick={() => {
          if (id) handleSongClick(id, currentSongArray);
        }}
      >
        <img src={img} alt='' />
        <div>
          <div style={{ color: color || '#fff' }} className={styles.title}>
            {title}
          </div>
          <div className={styles.artiste}>
            {artistName} &nbsp; / &nbsp; {duration}
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <AiOutlineEllipsis />
        <MdFavoriteBorder fill={id && likedSongs.includes(id) ? 'red' : 'white'} />
      </div>
    </div>
  );
};
const Queue = (props: Props) => {
  const { currentSongArray, currentSong, trackIndex, getTimeFormat, audio, queueDetails } = useMusicPlayer();
  //  const songArr = props.shuffle ? currentSongArray : originalSongArray
  return (
    <div className={styles.Queue}>
      <div className={styles.close} onClick={props.close}>
        <MdClose />
      </div>
      <div className={styles.Queue_title}>Queue: {queueDetails.title} </div>
      <div className={styles.curr_playing} style={{ marginTop: 30 }}>
        <SongCard
          color='#2DCEEF'
          title={currentSong?.title}
          artistName={currentSong?.artist?.name}
          id={currentSong?.id}
          likeClick={props.likeClick}
          likedSongs={props.likedSongs}
          img={queueDetails.cover || defaultCover}
          duration={audio.current && audio.current.duration ? getTimeFormat(+audio.current.duration) : '0:30'}
        />
      </div>

      <div className={styles.upNext}>
        <div className={styles.head}>
          <div>Next Up</div>
          <button
            onClick={props.handleShuffle}
            style={{ color: props.shuffle ? '#2dceef' : '#fff', borderColor: props.shuffle ? '#2dceef' : '#fff' }}
          >
            {props.shuffle ? 'Shuffle On' : 'Shuffle'}
          </button>
        </div>
        <div className={styles.list}>
          {currentSongArray.slice(trackIndex + 1).map((song) => {
            if (song.id !== currentSong?.id)
              return (
                <SongCard
                  title={song!.title}
                  id={song!.id}
                  likeClick={props.likeClick}
                  likedSongs={props.likedSongs}
                  img={queueDetails.cover || defaultCover}
                  artistName={song!.artist.name}
                  duration={audio.current && audio.current.duration ? getTimeFormat(+audio.current.duration) : '0:30'}
                />
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
