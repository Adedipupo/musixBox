import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import playlistScss from './PlaylistNav.module.scss';
import { PlaylistMenu } from './PlaylistMenu';

interface PlayTypes {
  name: string;
  path: string;
  cRoute: string;
}
function PlaylistNav() {
  const location = useLocation();

  return (
    <div className={playlistScss.allRoute}>
      {PlaylistMenu.map((item: PlayTypes, index: number) => (
        <div className={playlistScss.browse_route} key={index}>
          <NavLink
            activeClassName={playlistScss.navList}
            to={item.path}
            exact
            style={{ paddingBottom: '10px', color: item.path === location.pathname ? '#fff' : '#99999f' }}
          >
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default PlaylistNav;
