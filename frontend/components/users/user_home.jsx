import React from 'react';
import AnswerItem from '../question_detail/answer_item.jsx';
import AnswerPageIndexItem from '../answer_page/answer_page_index_item.jsx';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      imageFile: null,
      imageUrl: null
    };
    this.header = this.header.bind(this);
    this.image = this.image.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.answers = this.answers.bind(this);
    this.body = this.body.bind(this);
    this.questions = this.questions.bind(this);
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
        <header>
          {this.image()}
          <h2>{this.props.user.username}</h2>
          <form>
            <input type="file" onChange={this.updateFile} />
          </form>
        </header>
      );
    }
  }

  body() {
    return(
      <div className="user-body">
        <div className="user-sidebar">
          <h4>Feeds</h4>
          <ul>
            <li><a>Answers</a></li>
            <li><a>Questions</a></li>
            <li><a>Followers</a></li>
            <li><a>Following</a></li>
          </ul>
        </div>
        <div className="user-output">
          {this.answers()}
        </div>
      </div>
    );
  }

  answers() {
    if (this.props.user.answers) {
      return(
        this.props.user.answers.map( (answer, idx) => (
          <AnswerItem
            answer={answer}
            requestAllComments={this.props.requestAllComments}
            key={idx} />
        )
      ));
    }
  }

  questions() {
    if (this.props.user.questions) {
      return(
        this.props.user.questions.map( (question, idx) => (
          <AnswerPageIndexItem className="answer-page"
                               question={question}
                               currentUser={this.props.currentUser}
                               createAnswer={this.props.createAnswer}
                               key={idx} />
        ))
      );
    }
  }

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function() {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  image() {
    if (this.props.user.image) {
      return(
        <img src={this.props.user.image} />
      );
    } else {
      return(
        <img src={assets.francis} />
      );
    }
  }

  render() {
    if (this.props.user) {
      return(
        <div className="user-home">
          {this.header()}
          {this.body()}
        </div>
      );
    } else {
      return(
        <div/>
      );
    }
  }
}

export default UserHome;
