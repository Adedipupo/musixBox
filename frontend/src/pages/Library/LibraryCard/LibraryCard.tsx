import React from 'react';
import classes from './LibraryCard.module.css';

interface Props {
  children: React.ReactNode;
  length: number;
}

const LibraryCard = (props: Props) => {
  return (
    <div className={props.length > 0 ? classes['library-card'] : classes['library-card-one']}>{props.children}</div>
  );
};
export default LibraryCard;
