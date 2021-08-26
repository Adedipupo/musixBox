import React from 'react';
import userClass from './Navbar.module.scss';

function User() {
  return (
    <div className={userClass.user}>
      <i id={userClass.fa_user} className='far fa-user-circle'></i>
      <span className={userClass.user_name}>JohnDoe</span>
      <i className='fa fa-caret-down'></i>
    </div>
  );
}
export default User;
