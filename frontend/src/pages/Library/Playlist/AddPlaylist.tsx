import React from 'react';
import classes from './AddPlaylist.module.css';

interface Props {
  onHandleOpen: () => void;
}

const AddPlaylist = (props: Props) => {
  return (
    <div className={classes['create-card-wrapper']}>
      <div className={classes['create-playlist-card']}>
        <button onClick={props.onHandleOpen}>+</button>
        <h4>Create Playlist</h4>
      </div>
    </div>
  );
};

export default AddPlaylist;
