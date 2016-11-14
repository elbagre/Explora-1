import React from 'react';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.id);
    this.props.requestSingleUser(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.requestSingleUser(nextProps.id);
    }
  }

  header() {
    if (this.props.user) {
      return(
        <h1>{this.props.user.username}</h1>
      );
    }
  }

  render() {
    return(
      <div>
        {this.header()}
      </div>
    );
  }
}

export default UserHome;
