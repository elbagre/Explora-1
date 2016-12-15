import React from 'react';
import AnswerItem from '../question_detail/answer_item.jsx';
import AnswerPageIndexItem from '../answer_page/answer_page_index_item.jsx';
import QuestionIndexItem from '../questions/question_index_item.jsx';
import { hashHistory } from 'react-router';

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
    this.refreshUserActions = this.refreshUserActions.bind(this);
    this.state = {
      content: "answers"
    };
  }

  handleClick(id) {
    return () => hashHistory.push(`/question/${id}`);
  }

  componentDidMount() {
    this.props.requestSingleUser(this.props.id);
    this.props.requestUserActions();
  }

  componentWillUnmount() {
    this.props.receiveSingleUser({});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ content: "answers"});
      this.props.requestSingleUser(nextProps.id);
    }
  }

  refreshUserActions() {
    this.props.requestUserActions();
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

  changeContent(content) {
    return () => this.setState({content});
  }

  content() {
    if (this.state.content === "answers") {
      return this.answers();
    } else {
      return this.questions();
    }
  }

  body() {
    return(
      <div className="user-body">
        <div className="user-sidebar">
          <h4>Feeds</h4>
          <ul>
            <li><a onClick={this.changeContent("answers")}>Answers</a></li>
            <li><a onClick={this.changeContent("questions")}>Questions</a></li>
          </ul>
        </div>
        <div className="user-output">
          {this.content()}
        </div>
      </div>
    );
  }

  answers() {
    if (this.props.user.answers) {
      return(
        this.props.user.answers.map( (answer, idx) => (
          <div className="user-answer-item" key={idx}>
            <h3 onClick={this.handleClick(answer.questionId)}>{answer.question}</h3>
            <AnswerItem
              answer={answer}
              currentUser={this.props.currentUser}
              downvotedAnswers={this.props.downvotedAnswers}
              upvotedAnswers={this.props.upvotedAnswers}
              createUserAction={this.props.createUserAction}
              destroyUserAction={this.props.destroyUserAction}
              requestUserActions={this.props.requestUserActions}
              requestAllComments={this.props.requestAllComments}
              refreshUserActions={this.refreshUserActions}
            />
          </div>
        )
      ));
    }
  }

  questions() {
    if (this.props.user.questions) {
      return(
        <div className="user-answer-index">
        {this.props.user.questions.map( (question, idx) => (
          <AnswerPageIndexItem className="answer-page"
                               question={question}
                               currentUser={this.props.currentUser}
                               createAnswer={this.props.createAnswer}
                               createUserAction={this.props.createUserAction}
                               destroyUserAction={this.props.destroyUserAction}
                               requestUserActions={this.props.requestUserActions}
                               refreshUserActions={this.refreshUserActions}
                               passedQuestions={this.props.passedQuestions}
                               downvotedQuestions={this.props.downvotedQuestions}
                               key={idx} />
        ))}
        </div>
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
