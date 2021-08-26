import React from 'react';
import ArtistAlbumStyles from './ArtistAlbums.module.css';
import { Link } from 'react-router-dom';

interface Props {
  artist: any;
}

const ArtistAlbums: React.FC<Props> = (props) => {
  return (
    <div className={ArtistAlbumStyles.albums} id='album'>
      <h4 className={ArtistAlbumStyles.left}>Albums</h4>
      <div className={ArtistAlbumStyles.singleGenreGrid}>
        {props.artist.albums.slice(0, 14).map((album: any) => (
          <Link to={`/album/${album.id}`} className={ArtistAlbumStyles.albumLink} key={album.id}>
            <div key={album.id} className={ArtistAlbumStyles.singleGenreDiv}>
              <div
                className={ArtistAlbumStyles.singleGenreCard}
                style={{ background: `rgba(255, 255, 255, .1) url(${album.cover}) no-repeat 100% 100%/cover` }}
              ></div>
              <div className={ArtistAlbumStyles.name}>{album.title}</div>
              <p className={ArtistAlbumStyles.about}>Released: {album.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbums;
