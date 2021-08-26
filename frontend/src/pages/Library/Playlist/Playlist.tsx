import React, { useCallback, useContext, useEffect } from 'react';
import AddPlaylist from '../Playlist/AddPlaylist';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import BackdropRoller from '../../../ui/Backdrop/Backdrop';
import CustomizedAlerts from '../../../ui/Alert/Alert';
import LibraryList from '../LibraryList';
import LibraryCard from '../LibraryCard/LibraryCard';
import Modal from '../../../ui/Modal/Modal';
import Wrapper from '../Library';
import { SortContext } from '../../../context/SortContext';
import Spinner from '../../../ui/Loader/Loader';
import { secondsToHms } from '../../../utils/convertSecondsToHm';
import Tab from '../Tab';

interface Props {
  //declare props here
}

export interface Arr {
  duration: string;
  [propsName: string]: any;
}

export const formatTime = (arr: Arr[]) => {
  const dur = arr.reduce((a, b) => a + Number(b.duration), 0);
  const result = secondsToHms(dur);
  return result;
};

export interface PLAYLISTS {
  id: string;
  desc: string;
  name: string;
  updatedAt: string | Date;
  image?: string;
  type?: string;
  noOfTracks?: boolean;
  owner?: boolean;
  ownerName?: string;
}

export const SortData = (field: string, data: PLAYLISTS[]): PLAYLISTS[] => {
  data.sort((a, b) => {
    if (field === 'updatedAt') {
      return b.updatedAt > a.updatedAt ? 1 : -1;
    }
    if (field === 'songs') {
      const num1 = b.desc.split(' ')[0];
      const num2 = a.desc.split(' ')[0];
      return Number(num1) > Number(num2) ? 1 : -1;
    }
    return b.name > a.name ? -1 : 1;
  });
  return data;
};

const Library = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState('success');
  const [alertMsg, setAlertMsg] = React.useState('');
  const [playlists, setPlaylists] = React.useState<PLAYLISTS[]>([]);
  const [sortType, setSortType] = React.useState('updatedAt');
  const [SpinLoader, setLoader] = React.useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const ctx = useContext(AuthContext);
  const { token } = ctx.user;
  const { setGlobalPlaylist } = ctx;
  const { _id } = ctx.user.data;

  const URL = 'https://music-box-b.herokuapp.com/api/v1/music-box-api';

  const openHandler = () => {
    setOpen(true);
  };

  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSort = (field: string) => {
    setSortType(field);
    const loadData = SortData(field, playlists);
    setPlaylists(loadData);
  };

  const deletePlayList = async (id: string | undefined) => {
    setOpenBackdrop(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${URL}/playlist/delete/${id}`, config);
      await fetchData();
      setOpenBackdrop(false);
      setAlertMsg('Playlist deleted successfully');
      setAlertType('success');
      setOpenAlert(true);
    } catch (error) {
      setOpenBackdrop(false);
      setOpenBackdrop(false);
      setAlertMsg('An error occurred Please try again');
      setAlertType('error');
      setOpenAlert(true);
    }
  };

  const addData = async (data: Record<string, any>) => {
    setOpenBackdrop(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${URL}/playlist`, data, config);
      await fetchData();
      setOpenBackdrop(false);
      setAlertMsg('Playlist added successfully');
      setAlertType('success');
      setOpenAlert(true);
    } catch (error) {
      console.log(error.response.data.message);
      setOpenBackdrop(false);
      setAlertMsg('An error occurred Please try again');
      setAlertType('error');
      setOpenAlert(true);
    }
  };

  const fetchData = useCallback(async () => {
    const loadData = [];

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${URL}/playlist`, config);

    const privateRes = await axios.get(`${URL}/playlist/created`, config);

    setGlobalPlaylist(privateRes.data.data.payload);
    const isPublic = privateRes.data.data.payload.filter((p: Record<string, any>) => !p.isPublic);

    const { payload } = response.data.data;
    payload.push(...isPublic);

    for (const key in payload) {
      // const typeOfPlaylist = payload[key].ownerId === res.data.data._id ? 'owner' : 'liked'
      const owner = payload[key].ownerId._id === _id;
      const liked = payload[key].likes.includes(_id);
      const desc =
        payload[key].tracks.length > 1 ? payload[key].tracks.length + ' songs ' : payload[key].tracks.length + ' song ';
      if (owner || liked) {
        loadData.push({
          id: payload[key]._id,
          desc: desc + ' ' + formatTime(payload[key].tracks),
          name: payload[key].name,
          updatedAt: payload[key].updatedAt,
          type: owner ? 'owner' : 'liked',
          image: payload[key].imgURL,
          noOfTracks: !!payload[key].tracks.length,
          owner: owner,
        });
      }
    }
    const newData = SortData(sortType, loadData);
    setPlaylists(newData);
    setLoader(false);
  }, [sortType, _id, token, setGlobalPlaylist]);

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
            <LibraryCard length={playlists.length}>
              <AddPlaylist onHandleOpen={openHandler} />
              {playlists.map((m) => (
                <LibraryList
                  name={m.name}
                  description={m.desc}
                  key={m.id}
                  id={m.id}
                  playlistType={m.type}
                  image={m.image}
                  noOfTracks={m.noOfTracks}
                  playlistOwner={m.owner}
                  deleteUserPlaylist={(id: string | undefined) => deletePlayList(id)}
                />
              ))}
            </LibraryCard>
          </Wrapper>
          <Modal onAddPlaylist={addData} onOpen={open} onHandleClose={handleClose} />
        </SortContext.Provider>
      )}
      <CustomizedAlerts
        open={openAlert}
        alertType={alertType as 'success' | 'error'}
        alertMsg={alertMsg}
        onClose={closeAlert}
      />
      <BackdropRoller open={openBackdrop} />
    </React.Fragment>
  );
};

export default Library;
