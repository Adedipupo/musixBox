import React from 'react';
import classes from './Tab.module.css';
import DropDown from '../../ui/Dropdown/Dropdown';
import { useLocation } from 'react-router-dom';

interface Props {
  //
}

const Wrapper = (props: Props) => {
  const { pathname } = useLocation();
  let routePath = '';
  const path = pathname.split('/')[2];
  if (path === 'playlist') routePath = 'Playlists';
  if (path === 'album') routePath = 'Albums';
  if (path === 'artist') routePath = 'Artists';

  return (
    <div className={classes['tab']}>
      <div className={classes['tab-info']}>
        <h3>My {routePath}</h3>
        <DropDown />
      </div>
    </div>
  );
};
export default Wrapper;
