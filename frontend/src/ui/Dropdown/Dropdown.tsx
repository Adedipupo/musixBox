import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Dropdown.module.css';
import { SortContext } from '../../context/SortContext';
import MoreVertIcon from '@material-ui/icons/MoreHorizOutlined';

interface Props {}

const Dropdown: React.FunctionComponent = (props: Props) => {
  const ctx = useContext(SortContext);
  const [dropdownState, setDropdownState] = useState(false);
  const [currentState, setCurrentState] = useState('updatedAt');
  const container = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  const onClickHandler = () => {
    setDropdownState((prev) => !prev);
  };

  const handleClick = (e: { target: any }) => {
    if (container.current?.contains(e.target)) {
      // inside click
      return;
    }
    setDropdownState(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={classes['dropdown-container']} ref={container}>
      <div>
        <MoreVertIcon className={classes.moreIcon} onClick={onClickHandler} />
      </div>
      {dropdownState && (
        <div className={classes['sort-dropdown']}>
          <ul>
            <li
              className={currentState === 'updatedAt' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('updatedAt');
                return ctx.onSortHandler('updatedAt');
              }}
            >
              Date Added
            </li>
            <li
              className={currentState === 'name' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('name');
                return ctx.onSortHandler('name');
              }}
            >
              A - Z
            </li>
            <li
              className={currentState === 'songs' ? classes.isActive : ''}
              onClick={() => {
                setCurrentState('songs');
                return ctx.onSortHandler('songs');
              }}
            >
              {path === 'artist' ? 'Likes' : 'Number of Songs'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
