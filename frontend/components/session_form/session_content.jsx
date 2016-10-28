import React from 'react';
import SessionLinks from './session_links.jsx';
import HeaderContainer from '../functional_components/header_container.js';

const SessionContent = ({children}) => (
  <div className="session-content">
    <HeaderContainer />
    <div className="session_form_container">
      <SessionLinks children={children} />
    </div>
  </div>
);

export default SessionContent;
