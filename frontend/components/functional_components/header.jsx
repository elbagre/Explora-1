import React from 'react';
import Search from '../search/search_container.js';
import { Link, hashHistory } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: "home-nav"
    };
    this.toggleFocus = this.toggleFocus.bind(this);
    this.untoggleFocus = this.untoggleFocus.bind(this);
  }
  //
  componentWillReceiveProps(nextProps) {
    if (nextProps.modal === "modal") {
      this.untoggleFocus();
    }
  }

  handleClick(route) {
    return () => hashHistory.push(route);
  }

  untoggleFocus() {
    this.setState({ focus: "home-nav"});
  }

  toggleFocus() {
      this.setState({ focus: "home-nav focused" });
      this.props.toggleModalFocus();
  }

  render () {
    if (this.props.currentUser) {
      return (
        <div className="home-header">
          <nav className={this.state.focus}>
            <Search toggleFocus={this.toggleFocus}
              untoggleModal={this.props.untoggleModal}/>
            <ul className="home-links">
              <li className="read"><Link to="/home" >
                Read
              </Link></li>
            <li className="answer"><Link to="/answer">
                Answer
              </Link></li>
              <li><button onClick={this.props.logout}>Logout</button></li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="root-header">
          <h1>Explora</h1>
        </div>
      );
    }
  }
}

export default Header;
