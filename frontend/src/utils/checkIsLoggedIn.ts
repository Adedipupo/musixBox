export const checkIsLoggedIn = () => {
  const user = localStorage.getItem('musicApiUser');

  return user ? true : false;
};
