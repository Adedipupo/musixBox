import React, { useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import classes from './Artist.module.css';
import LibraryList from '../LibraryList';
import LibraryCard from '../LibraryCard/LibraryCard';
import { SortContext } from '../../../context/SortContext';
import Spinner from '../../../ui/Loader/Loader';
import { SortData, PLAYLISTS } from '../Playlist/Playlist';
import Tab from '../Tab';
import Wrapper from '../Library';

interface Props {
  //declare props here
}

const Library = (props: Props) => {
  const [artists, setArtists] = React.useState<PLAYLISTS[]>([]);
  const [sortType, setSortType] = React.useState('updatedAt');
  const [SpinLoader, setLoader] = React.useState(true);
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;

  const handleSort = (field: string) => {
    setSortType(field);
    const loadData = SortData(field, artists);
    setArtists(loadData);
  };
  const fetchData = useCallback(async () => {
    const loadData = [];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const err = 'User liked no artist';
    try {
      const response = await axios.get('https://music-box-b.herokuapp.com/api/v1/music-box-api/artist/likes', config);
      const { payload } = response.data.data;

      for (const key in payload) {
        loadData.push({
          id: payload[key].id,
          desc: `${
            payload[key].likedCount > 1 ? payload[key].likedCount + ' likes' : payload[key].likedCount + ' like'
          }`,
          name: payload[key].name,
          updatedAt: payload[key].updatedAt,
          image: payload[key].picture,
        });
      }
      const newData = SortData(sortType, loadData);
      setArtists(newData);
      setLoader(false);
    } catch (error) {
      if (error.response.data.message === err) {
        setArtists([]);
        setLoader(false);
      }
    }
  }, [sortType, token]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {SpinLoader && <Spinner />}
      {!SpinLoader && (
        <SortContext.Provider
          value={{
            onSortHandler: handleSort,
          }}
        >
          <Wrapper>
            <Tab />
            <LibraryCard length={artists.length}>
              {artists.length > 0 &&
                artists.map((m) => (
                  <LibraryList name={m.name} description={m.desc} key={m.id} id={m.id} image={m.image} />
                ))}
              {artists.length === 0 && (
                <h3 className={classes['no-artist-text']}>Artists you've liked will display here</h3>
              )}
            </LibraryCard>
          </Wrapper>
        </SortContext.Provider>
      )}
    </React.Fragment>
  );
};

export default Library;
