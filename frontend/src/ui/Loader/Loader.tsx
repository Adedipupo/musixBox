import React from 'react';
import Loader from 'react-loader-spinner';

const spinLoader = () => {
  return (
    <div
      style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999999999999999999,
      }}
    >
      <Loader type='Bars' color='#2DCEEF' height={50} width={50} />
    </div>
  );
};

export default spinLoader;
