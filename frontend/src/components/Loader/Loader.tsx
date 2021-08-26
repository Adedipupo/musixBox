import React from 'react';
import { Spinner } from 'react-bootstrap';
interface Props {}

const Loader = (props: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner
        animation='border'
        role='status'
        style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
