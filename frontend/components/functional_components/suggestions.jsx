import React from 'react';
import { Link } from 'react-router';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestAllUsers();
  }

  suggestedUsers() {
    return this.props.users.map( (user, idx) => {
      return(
        <li key={idx}>
        <Link to={`/user/${user.id}`}>
        <span />
        <p>{user.name}</p>
        </Link>
        </li>
      );
    }).slice(0,5);
  }

  render() {
    const gitPath = `#{Rails.root}/app/assets/images/github.png/`;
    return(
      <div className= "suggestion-container">
        <div>
          <h4>Suggested Users</h4>
          <ul>
            {this.suggestedUsers()}
          </ul>
        </div>
        <div className="professional-links">
          <h4>Professional Links</h4>
          <ul>
            <li><a href="http://github.com/souiukoto"><img src="/assets/github-d83ddf4ea98e9d2e77848869cbe5f0ecabb3058ede22c681bbe07b45a9091909.png" /><p>Git</p></a></li>
            <li><a href="http://goo.gl/nyXANM"><img src="/assets/linkedin-c7c51bf578a654a496432bdfed8af0c63467e97608a6ba790e35daea4ded1c99.png"/>
            <p>LinkedIn</p></a></li>
            <li>
              <a href="http://souiukoto.github.io/personal-webpage">
              <img className="profile-pic" src="/assets/profile-df8a098c0a61cd4981807d1111f17a2c677cff213c6170b57ce9155db28415aa.jpg"/>
              <p>Portfolio</p></a></li>
          </ul>
        </div>
      </div>
    );
  }
}

// ActionController::Base.helpers.asset_path(path)

export default Suggestions;
