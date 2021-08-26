import React from 'react';
import { useHistory } from 'react-router-dom';
import artistgenreStyle from './GenreArtist.module.css';
import Loader from '../../ui/Loader/Loader';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

interface Props {
  id?: number;
  artistes: any[];
  showHidden: (a: string) => void;
  isLoading: boolean;
  error: string;
}
const GenreArtist: React.FC<Props> = (props) => {
  const history = useHistory();
  const selectArtist = (id: string) => {
    history.push(`/artist/${id}`);
  };

  return (
    <>
      {props.error && <h1>An error occurred, pls try again...</h1>}
      {props.isLoading && !props.error && (
        <div className={artistgenreStyle.artistLoader}>
          <Loader />
        </div>
      )}
      {props.artistes && props.artistes.length !== 0 && !props.isLoading && (
        <>
          <div className={artistgenreStyle.section}>
            <h4 className={artistgenreStyle.left}>Artists</h4>
            <p className={artistgenreStyle.right} onClick={() => props.showHidden('artists')}>
              view all
            </p>
          </div>
          <motion.div
            className={artistgenreStyle.artistFlex}
            initial='out'
            animate='in'
            variants={pageTransition}
            transition={transit}
          >
            {props.artistes.slice(0, 7).map((artiste) => {
              return (
                <div key={artiste.id} className={artistgenreStyle.artistDiv} onClick={() => selectArtist(artiste.id)}>
                  <img
                    style={{ background: 'rgba(255, 255, 255, .1)' }}
                    src={artiste.picture}
                    className={artistgenreStyle.artistImage}
                    alt=''
                  />
                  <div className={artistgenreStyle.artistName}>{artiste.name}</div>
                </div>
              );
            })}
          </motion.div>
        </>
      )}
    </>
  );
};

export default GenreArtist;
