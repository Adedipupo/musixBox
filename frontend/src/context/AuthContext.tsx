import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// This is just a dummy context file which exports loggedIn state and function to set LoggedIn status

interface Props {
  children: ReactNode;
}

interface AuthStatus {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isloading: boolean;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  login: (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => void;
  register: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string
  ) => void;
  user: any;
  showSignup: boolean;
  showLogin: boolean;
  onHide: () => void;
  setShowSignup: Dispatch<SetStateAction<boolean>>;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  setLoginMessage: Dispatch<SetStateAction<string>>;
  loginMessage: string;
  setUser: Dispatch<SetStateAction<string>>;
  genreName: string;
  artistName: string;
  setGenreName: Dispatch<SetStateAction<string>>;
  setArtistName: Dispatch<SetStateAction<string>>;
  globalPlaylist: any;
  setGlobalPlaylist: Dispatch<SetStateAction<any>>;
  playlistModal: boolean;
  setPlaylistModal: Dispatch<SetStateAction<boolean>>;
  songToAdd: any;
  setSongToAdd: Dispatch<SetStateAction<any>>;
}
// interface Genre {
//   genreId: number;
//   id: number;
//   name: string;
//   picture_xl: string;
// }
export const AuthContext = createContext({} as AuthStatus);

const AuthProvider = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [globalPlaylist, setGlobalPlaylist] = useState<any>(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('musicApiUser') as string) || null);
  const [genreName, setGenreName] = useState('');
  const [artistName, setArtistName] = useState('');

  const [playlistModal, setPlaylistModal] = useState(false);
  const [songToAdd, setSongToAdd] = useState(null);
  const history = useHistory();

  // const history = useHistory();
  const onHide = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  async function register(
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string
  ) {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.split('-').join('/'),
        gender,
      };

      setIsLoading(true);
      const { data } = await axios.post(
        'https://music-box-b.herokuapp.com/api/v1/music-box-api/users/register',
        registerData
      );
      setIsLoading(false);

      localStorage.setItem('musicApiUser', JSON.stringify(data.data));
      setUser(data.data);
      onHide();
      history.push('/home', { from: 'login' });

      setIsLoggedIn(true);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        err.response.data && err.response.data.message && setError(err.response.data.message);
      } else {
        setError('network error');
      }
    }
  }

  async function login(e: React.FormEvent<HTMLFormElement>, email: string, password: string) {
    e.preventDefault();
    try {
      const loginUser = {
        email,
        password,
      };

      setIsLoading(true);
      const { data } = await axios.post(
        'https://music-box-b.herokuapp.com/api/v1/music-box-api/users/login',
        loginUser
      );
      setIsLoading(false);
      localStorage.setItem('musicApiUser', JSON.stringify(data.data));
      onHide();

      setIsLoggedIn(true);
      setUser(data.data);
      history.push('/home', { from: 'login' });
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        err.response.data && err.response.data.message && setError(err.response.data.message);
      } else {
        setError('network error');
      }
    }
  }
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    error,
    isloading,
    login,
    register,
    setError,
    showSignup,
    showLogin,
    onHide,
    setShowSignup,
    setShowLogin,
    user,
    loginMessage,
    setLoginMessage,
    setUser,
    genreName,
    setGenreName,
    artistName,
    setArtistName,
    globalPlaylist,
    setGlobalPlaylist,
    setPlaylistModal,
    playlistModal,
    setSongToAdd,
    songToAdd,
  };
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
