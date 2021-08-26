import React from 'react';
import allArtistsStyles from './AllArtists.module.css';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

interface Props {
  artistes: any[];
}

const AllArtists: React.FC<Props> = (props) => {
  const history = useHistory();
  const selectArtist = (id: string) => {
    history.push(`/artist/${id}`);
  };
  return (
    <motion.div initial='out' animate='in' variants={pageTransition} transition={transit}>
      <div className={allArtistsStyles.section}>
        <h4 className={allArtistsStyles.left}>Artists</h4>
      </div>

      <div className={allArtistsStyles.artistFlex}>
        {props.artistes.map((artiste) => {
          return (
            <div key={artiste.id} className={allArtistsStyles.artistDiv} onClick={() => selectArtist(artiste.id)}>
              <img src={artiste.picture} className={allArtistsStyles.artistImage} alt={artiste.name} />
              <div className={allArtistsStyles.artistName}>{artiste.name}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AllArtists;
