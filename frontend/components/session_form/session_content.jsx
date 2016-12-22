import React from 'react';
import SessionLinksContainer from './session_links_container.js';
import HeaderContainer from '../functional_components/header_container.js';

const SessionContent = ({children}) => (
  <div className="session-content">
    <HeaderContainer />
    <div className="session_form_container">
      <SessionLinksContainer children={children} />
    </div>
  </div>
);

export default SessionContent;
