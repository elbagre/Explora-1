import React from 'react';

class TopicHome extends React.Component {
  constructor(props) {
    super(props);
    this.questions = this.questions.bind(this);
    this.header = this.header.bind(this);
  }

  componentDidMount() {
    this.props.requestSingleTopic(this.props.id);
    this.props.requestUserActions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.requestSingleTopic(nextProps.id);
    }
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
            <li><button>Follow Topic</button></li>
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
