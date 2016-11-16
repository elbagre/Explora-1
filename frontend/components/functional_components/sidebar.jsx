import React from 'react';
import { Link } from 'react-router';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.topicLinks = this.topicLinks.bind(this);
  }
  componentDidMount() {
    this.props.requestAllTopics();
  }

  topicLinks() {
    const continents = ["Africa", "Asia", "America", "Europe", "Australia"];
    if (this.props.topics.length !== 0) {
      return( this.props.topics.filter( (topic) => (
        continents.includes(topic.name)
      )).map( (topic, idx) => (
          <li key={idx}><Link to={`/topic/${topic.id}`}>{topic.name}</Link>
          </li>
        ))
      );
    }
  }

  render() {
    if (this.props.location.slice(1, 6) === 'topic' || this.props.location.slice(1, 5) === 'user') {
      return (
        <div />
      );
    } else {
      return (
        <aside className="sidebar">
          <nav className="feeds">
            <header>
              <h4>Feeds</h4>
              <p>Edit</p>
            </header>
            <ul>
              {this.topicLinks()}
            </ul>
          </nav>
        </aside>
      );
    }
  }
}

export default SideBar;
