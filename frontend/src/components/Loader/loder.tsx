import React from 'react';
import Loader from 'react-loader-spinner';

const SpinLoader = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader type='Bars' color='#2DCEEF' height={50} width={50} />
    </div>
  );
};

export default SpinLoader;
