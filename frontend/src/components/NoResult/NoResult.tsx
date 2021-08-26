import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './NoResult.module.css';
interface Props {
  //declare props here
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const NoResult = ({ show, setShow }: Props) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton className={styles.modalheader}></Modal.Header> */}
        <Modal.Body className={styles.modalContent}>
          <h2 className={styles.noResult}>No Result</h2>
          <h4 className={styles.text}>MusicFInder didn't quite catch that</h4>
          <h5 className={styles.text2}>Try Again</h5>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NoResult;
