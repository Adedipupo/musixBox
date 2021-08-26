import React from 'react';
import { useHistory } from 'react-router-dom';
import albumCard from './AlbumCard.styles';

type Props = {
  album: any;
  artistName: string;
  seturlId: any;
  setAlbum: any;
};

const AlbumCard: React.FC<Props> = ({ album, artistName, seturlId, setAlbum }) => {
  const history = useHistory();
  const classes = albumCard();
  const handleClick = () => {
    setAlbum(null);
    history.push(`/album/${album.id}`);
    window.scrollTo(0, 0);
    seturlId(album.id);
    // window.location.reload();
  };
  return (
    <div onClick={handleClick} className={classes.albumCard}>
      <div className={classes.albumImgBox}>
        <img className={classes.albumImg} src={album.cover_medium} alt='album pic' />
      </div>
      {/* <h4 className={classes.albumTitle}>{artistName}</h4> */}
      <h4 className={classes.albumDate}>Released: {album.release_date}</h4>
    </div>
  );
};

export default AlbumCard;
