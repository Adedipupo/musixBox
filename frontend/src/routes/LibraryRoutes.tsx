import React from 'react';
import { Route } from 'react-router-dom';

import AlbumLibrary from '../pages/Library/Album/Album';
import ArtistLibrary from '../pages/Library/Artist/Artist';
import PlaylistLibrary from '../pages/Library/Playlist/Playlist';

const Library = () => {
  return (
    <>
      <Route path='/:parent/album' component={AlbumLibrary} />
      <Route path='/:parent/artist' component={ArtistLibrary} />
      <Route path='/:parent/playlist' component={PlaylistLibrary} />
    </>
  );
};
export default Library;
