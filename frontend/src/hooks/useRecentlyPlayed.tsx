import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MusicPlayerContext } from '../context/MusicPlayerContext';
import axios from 'axios';

export type DirectoryTypes = 'playlist' | 'artist' | 'album';

/**
 *
 * @param id Id of directory eg playlist or artist or album
 * @param directory name of directory eg playlist, artist or album
 */

export const useRecentlyPlayed = () => {
  const userCtx = useContext(AuthContext);
  const songCtx = useContext(MusicPlayerContext);

  const addToRecentlyPlayed = async (directory: DirectoryTypes, id: string) => {
    if (songCtx.currentSong && songCtx.recentlyPlayed !== id) {
      try {
        const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api/recently-played';
        const config = {
          headers: {
            Authorization: `Bearer ${userCtx.user.token}`,
          },
        };

        await axios.post(URL, { directory, id }, config);
        songCtx.setRecentlyPlayed(id);
      } catch (error) {
        // console.log(error);
      }
    }
  };
  return { addToRecentlyPlayed };
};
