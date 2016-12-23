import React from 'react';
import { hashHistory } from 'react-router';
import AnswerForm from '../question_detail/answer_form.jsx';

class AnswerPageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      answer: "",
      toggle: "answer-box"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
    this.isDownvoted = this.isDownvoted.bind(this);
    this.togglePass = this.togglePass.bind(this);
    this.isPassed = this.isPassed.bind(this);
  }

  componentDidMount() {
    this.setState({
      count: this.props.question.answer_count
    });
  }

  handleToggle() {
    if (this.state.toggle === "answer-box") {
      this.setState({ toggle: "answer-box toggled" });
    } else {
      this.setState({ toggle: "answer-box"});
    }
  }

  handleChange(type) {
    return (e) => {
      this.setState({ [type]: e.currentTarget.value });
    };
  }

  handleClick() {
    hashHistory.push(`/question/${this.props.question.id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createAnswer({
      body: this.state.answer,
      question_id: this.props.question.id,
      author_id: this.props.currentUser.id
    });
    this.setState({
      answer: "",
      toggle: "answer-box",
      count: this.state.count + 1
    });
  }

  answers() {
    if (this.state.count > 1) {
      return(
        <a onClick={this.handleClick}>{this.state.count} Answers</a>
      );
    } else if (this.state.count === 1) {
      return(
        <a onClick={this.handleClick}>{this.state.count} Answer</a>
      );
    }
  }

  handleDownvote() {
    if (this.isDownvoted()) {
      return "Downvoted";
    } else {
      return "Downvote";
    }
  }

  toggleDownvote() {
    if (this.isDownvoted()) {
      this.props.destroyUserAction(this.downvoteId());
    } else {
      this.props.createUserAction({
        user_id: this.props.currentUser.id,
        actionable_id: this.props.question.id,
        actionable_type: "Question",
        user_action: "downvote"
      });
    }
    this.props.refreshUserActions();
  }

  downvoteId() {
    const idx = this.downvotedQuestionIds().indexOf(this.props.question.id);
    return this.props.downvotedQuestions[idx].id;
  }

  isDownvoted() {
    if (this.downvotedQuestionIds().indexOf(this.props.question.id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  downvotedQuestionIds() {
    return this.props.downvotedQuestions.map( (downvote) => {
      return downvote.actionable_id;
    });
  }

  handlePass() {
    if (this.isPassed()) {
      return "Passed";
    } else {
      return "Pass";
    }
  }

  togglePass() {
    if (this.isPassed()) {
      this.props.destroyUserAction(this.passId());
    } else {
      this.props.createUserAction({
        user_id: this.props.currentUser.id,
        actionable_id: this.props.question.id,
        actionable_type: "Question",
        user_action: "pass"
      });
    }
    this.props.refreshUserActions();
  }

  passId() {
    const idx = this.passedQuestionIds().indexOf(this.props.question.id);
    return this.props.passedQuestions[idx].id;
  }

  isPassed() {
    if (this.passedQuestionIds().indexOf(this.props.question.id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  passedQuestionIds() {
    return this.props.passedQuestions.map( (pass) => {
      return pass.actionable_id;
    });
  }

  render() {
    return (
    <article className={this.state.toggle}>
      <h3 className="question-title"
          onClick={this.handleClick}
          >{this.props.question.title}</h3>
      {this.answers()}
      <ul className="question-links group">
        <li><button className="toggle" onClick={this.handleToggle}>Answer</button></li>
        <li><button onClick={this.togglePass}>{this.handlePass()}</button></li>
        <li><a onClick={this.toggleDownvote}>{this.handleDownvote()}</a></li>
      </ul>
      <AnswerForm
        currentUser={this.props.currentUser}
        id={this.props.question.id}
        createAnswer={this.props.createAnswer}/>
      </article>
    );
  }
}

export default AnswerPageIndexItem;
