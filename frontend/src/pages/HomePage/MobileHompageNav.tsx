import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import mobileHome from './HomePage.module.scss';

function MobileHompageNav() {
  const overviewRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);
  const mostPlayedRef = useRef<HTMLDivElement>(null);
  const executeScroll = (ref: React.RefObject<HTMLDivElement>) =>
    ref.current ? ref.current.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' }) : null;
  return (
    <div className={mobileHome.mobile_route}>
      <NavLink activeClassName={mobileHome.active} to='#/' onClick={() => executeScroll(overviewRef)} exact>
        OVERVIEW
      </NavLink>
      <NavLink activeClassName={mobileHome.currentPOS} to='#/' onClick={() => executeScroll(genreRef)} exact>
        GENRE AND MOOD
      </NavLink>
      <NavLink activeClassName={mobileHome.currentPOS} to='#/' onClick={() => executeScroll(mostPlayedRef)} exact>
        MOST PLAYED ARTIST
      </NavLink>
    </div>
  );
}

export default MobileHompageNav;
