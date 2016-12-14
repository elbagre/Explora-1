import React from 'react';

class TopicHome extends React.Component {
  constructor(props) {
    super(props);
    this.questions = this.questions.bind(this);
    this.header = this.header.bind(this);
    this.handleClass = this.handleClass.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.isFollowed = this.isFollowed.bind(this);
    this.followedTopicIds = this.followedTopicIds.bind(this);
    this.followId = this.followId.bind(this);
  }

  componentDidMount() {
    this.props.requestSingleTopic(this.props.id);
    this.props.requestUserActions();
  }

  componentWillUnmount() {
    this.props.receiveSingleTopic([]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.requestSingleTopic(nextProps.id);
    }
  }

  handleClass() {
    if (this.isFollowed()) {
      return "Following";
    } else {
      return "Follow";
    }
  }

  toggleFollow() {
    if (this.isFollowed()) {
      this.props.destroyUserAction(this.followId());
    } else {
      this.props.createUserAction({
        user_id: this.props.currentUser.id,
        actionable_id: this.props.topic.id,
        actionable_type: "Topic",
        user_action: "follow"
      });
    }
    this.props.requestUserActions();
  }

  followId() {
    const idx = this.followedTopicIds().indexOf(this.props.topic.id);
    return this.props.follows[idx].id;
  }

  isFollowed() {
    if (this.followedTopicIds().indexOf(this.props.topic.id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  followedTopicIds() {
    return this.props.follows.map( (follow) => {
      return follow.actionable_id;
    });
  }

  image(question) {
    if (question.image !== "/images/original/missing.png") {
      return (
        <div className="cover-photo">
          <img src={question.image} />
        </div>
      );
    }
  }

  header() {
    if (this.props.topic) {
      return (
        <header>
          <h1>{this.props.topic.name}</h1>
          <ul>
            <li>Overview</li>
            <li>Feed</li>
            <li>Answer</li>
            <li><button onClick={this.toggleFollow}
                        className={this.handleClass().toLowerCase()}
                        >{this.handleClass()}</button></li>
          </ul>
        </header>
      );
    }
  }

  questions() {
    if (this.props.topic.questions) {
      return (
        this.props.topic.questions.map( (question, idx) => (
          <div key={idx} className="topic-item">
            <h3>{question.title}</h3>
            <div>
              {this.image(question)}
              <div>
                <h4>{question.most_upvoted_author}</h4>
                <p>{question.most_upvoted_answer.body}</p>
              </div>
            </div>
          </div>
        ))
      );
    }
  }

  render() {
    return (
      <div className="topic-home">
        {this.header()}
        <div className="topic-container">
          {this.questions()}
        </div>
      </div>
    );
  }
}

export default TopicHome;
