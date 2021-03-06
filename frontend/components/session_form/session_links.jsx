import React from 'react';
import { Link } from 'react-router';
import GuestButton from './guest/guest_login.js';

class SessionLinks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  displayErrors() {
    if (this.props.errors.length) {
      return(
        <div className="register-errors">Incorrect username or password</div>
      );
    }
  }

  render(){
    return(
      <div>
        <nav className="registration">
          <ul className="registration-links">
            <li><button><Link to="/signup">Create Account</Link></button></li>
            <li><button><Link to="/login">Log In</Link></button></li>
            <li><GuestButton /></li>
          </ul>
          {this.props.children}
        </nav>
        {this.displayErrors()}
      </div>
    );
  }
}

export default SessionLinks;
