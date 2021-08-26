import React from 'react';
import { MenuItem } from '../Navbar/MenuItems';
import { NavLink } from 'react-router-dom';
import mbClass from '../Navbar/Navbar.module.scss';

function MobileNav() {
  return (
    <>
      {MenuItem.map((item, index: number) => {
        if (index > 3) {
          return (
            <span>
              <div className={mbClass.route} key={index}>
                <NavLink to={item.path}>
                  <div>{item.name}</div>
                </NavLink>
              </div>
            </span>
          );
        }
        return null;
      })}
    </>
  );
}

export default MobileNav;
