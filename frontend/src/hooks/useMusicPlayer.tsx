import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MusicPlayerContext, Music } from '../context/MusicPlayerContext';
import axios from 'axios';

const useMusicPlayer = () => {
  const {
    currentSong,
    trackIndex,
    setTrackIndex,
    playing,
    setPlaying,
    setCurrentSong,
    currentSongArray,
    setCurrentSongArray,
    originalSongArray,
    setOriginalSongArray,
    queueTitle,
    setQueueTitle,
    queueDetails,
    setQueueDetails,
  } = useContext(MusicPlayerContext);
  const audio = useRef<HTMLAudioElement>(new Audio(currentSong?.preview));
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const { user } = useContext(AuthContext);
  const updateListeningHistory = async (id: number) => {
    try {
      await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/history/updateHistory/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param id Id of song to be played
   * @param arr an array of songs from which song is to be played
   */
  const handleSongClick = (id: number, arr?: Music[]) => {
    if (arr) {
      const index = arr.findIndex((song) => song.id === id);
      if (id === currentSong?.id) {
        return toggleMusicPlay();
      }
      setCurrentSongArray(arr);
      if (!originalSongArray.find((song) => song.id === id)) setOriginalSongArray(arr);
      setCurrentSong(arr[index]);
      setTrackIndex(index);
      setPlaying(true);
      updateListeningHistory(id);
    }
  };
  const toggleMusicPlay = () => {
    if (!currentSong?.preview) return;
    setPlaying(!playing);
  };
  const handleShuffle = () => {
    function shuffleArr(array: Music[]) {
      var currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }
    if (shuffle) {
      setCurrentSongArray(originalSongArray);
    } else {
      const arrayToShuffle = originalSongArray.filter((song) => song.id !== currentSong?.id);

      const sortedArray = shuffleArr(arrayToShuffle);
      if (currentSong) sortedArray.unshift(currentSong);
      setCurrentSongArray(sortedArray);
      setTrackIndex(0);
    }
    setShuffle(!shuffle);
    if (repeat) setRepeat(false);
  };
  const toggleRepeat = () => {
    setRepeat(!repeat);
    if (shuffle) handleShuffle();
  };
  const getTimeFormat = (sec: number): string => {
    const date = new Date(0);
    date.setSeconds(sec);
    const timeString = date.toISOString().substr(14, 5);
    return timeString;
  };

  return {
    playing,
    currentSong,
    handleSongClick,
    getTimeFormat,
    toggleMusicPlay,
    currentSongArray,
    setCurrentSongArray,
    originalSongArray,
    queueTitle,
    setPlaying,
    trackIndex,
    setTrackIndex,
    shuffle,
    setShuffle,
    handleShuffle,
    audio,
    setQueueTitle,
    queueDetails,
    setQueueDetails,
    repeat,
    toggleRepeat,
  };
};

export default useMusicPlayer;
