import React, { useRef, useEffect } from 'react';
import classes from './LibraryCardDropdown.module.css';

interface Props {
  //
  open: boolean;
  closeDropdown: () => void;
  openHandler: () => void;
  deleteHandler: (e: any, owner: string | undefined) => void;
  owner: string | undefined;
}

const Dropdown = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);

  const handleClick = (e: { target: any }) => {
    if (container.current?.contains(e.target)) {
      // inside click
      return;
    }
    props.closeDropdown();
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {props.open && (
        <div className={classes['dropdown-container']} ref={container}>
          <div className={classes['sort-dropdown']}>
            <ul>
              <li onClick={props.openHandler}>Open</li>
              <li onClick={(e) => props.deleteHandler(e, props.owner)}>Delete</li>
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dropdown;
