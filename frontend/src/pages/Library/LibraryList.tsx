import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './LibraryList.module.css';
import DeleteDropdown from '../../components/LibraryCardDropdown/LibraryCardDropdown';
import getImageByKey from '../../utils/getImageByKey';
import LikedAvatar from '../../assets/library/liked.png';
import MoreVertIcon from '@material-ui/icons/MoreHorizOutlined';

interface Props {
  //declare props here
  name?: string;
  description?: string;
  key?: any;
  id?: string;
  image?: string;
  playlistType?: string;
  noOfTracks?: boolean;
  playlistOwner?: boolean;
  deleteUserPlaylist?: (id: string | undefined) => void;
}
const LibraryList = (props: Props) => {
  const { pathname } = useLocation();
  const [dropdownState, setDropdownState] = useState(false);
  const [showMore, setShowMore] = useState(false);
  let routePath = '';
  const path = pathname.split('/')[2];
  if (path === 'playlist') routePath = 'Playlists';
  if (path === 'album') routePath = 'Albums';
  if (path === 'artist') routePath = 'Artists';

  let picturePicker: string | undefined = '';
  const history = useHistory();
  // let start: number = 0;
  // let end: number = 0;
  // let diff: number = 0;
  // let clickTime: number = 500;

  const clickHandler = (event: any) => {
    history.push(`../${path}/${props.id}`);
  };

  const openMore = (event: any) => {
    event.stopPropagation();
    handleOpenDropdown();
  };

  const handleOpenDropdown = () => {
    setDropdownState(true);
  };
  const handleCloseDropdown = () => {
    setDropdownState(false);
  };
  const deletePlaylist = (e: any, id: string | undefined) => {
    //
    e.stopPropagation();
    if (props.deleteUserPlaylist) {
      props.deleteUserPlaylist(id);
    }
  };

  let playlistPic = '';

  if (props.playlistType === 'owner' && props.noOfTracks) {
    playlistPic = getImageByKey('owner');
  } else if (props.playlistType === 'owner' && !props.noOfTracks) {
    playlistPic = props.image as string;
  } else {
    playlistPic = LikedAvatar;
  }

  switch (routePath) {
    case 'Artists':
      picturePicker = props.image;
      break;
    case 'Albums':
      picturePicker = props.image;
      break;
    default:
      picturePicker = playlistPic;
      break;
  }
  return (
    <div
      className={classes['library-wrapper']}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
      onClick={clickHandler}
    >
      <div>
        {path === 'playlist' && showMore && props.playlistOwner && (
          <MoreVertIcon onClick={(e: any) => openMore(e)} className={classes['more-icon']} />
        )}
        <div
          className={classes['library-image-card']}
          style={{ margin: routePath === 'Artists' ? '0 auto' : undefined }}
        >
          <div
            className={`${classes['library-img']} ${routePath === 'Artists' ? classes['img-circle'] : ''}`}
            style={{ background: `rgba(255, 255, 255, .1) url(${picturePicker})`, backgroundSize: 'cover' }}
          ></div>
        </div>
        <div className={`${classes['library-card-desc']} ${routePath === 'Artists' ? classes['desc-center'] : ''}`}>
          <h5>{props.name}</h5>
          <div className={classes.artistLikes}>
            <span style={{ fontWeight: 300 }}>{props.description}</span>
          </div>
        </div>
      </div>
      <DeleteDropdown
        owner={props.id}
        open={dropdownState}
        closeDropdown={handleCloseDropdown}
        openHandler={handleOpenDropdown}
        deleteHandler={deletePlaylist}
      />
    </div>
  );
};
export default LibraryList;
