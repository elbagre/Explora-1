import React from 'react';
import { Link } from 'react-router';
import GuestButton from './guest/guest_login.js';

const SessionLinks = ({ currentUser, children }) => {
  return(
    <nav className="registration">
      <ul className="registration-links">
        <li><button><Link to="/signup">Create Account</Link></button></li>
        <li><button><Link to="/login">Log In</Link></button></li>
        <li><GuestButton /></li>
      </ul>
      {children}
    </nav>
  );
};

export default SessionLinks;
