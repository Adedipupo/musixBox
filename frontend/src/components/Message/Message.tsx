import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  message: any;
  clearError: () => void;
}

function ErrorNotice(props: Props) {
  return (
    <div
      className='error-notice ml-2 mr-2'
      style={{ position: 'absolute', top: '10px', left: '0px', right: '0px', textAlign: 'center' }}
    >
      <Alert variant='danger' style={{ height: '3.5rem', textAlign: 'center' }} onClose={props.clearError} dismissible>
        {props.message}
      </Alert>
    </div>
  );
}

export default ErrorNotice;
