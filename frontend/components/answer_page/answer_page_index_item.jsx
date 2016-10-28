import React from 'react';
import { hashHistory } from 'react-router';

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

  render() {
    return (
    <article className={this.state.toggle}>
      <h3 className="question-title"
          onClick={this.handleClick}
          >{this.props.question.title}</h3>
      {this.answers()}
      <ul className="question-links group">
        <li><button className="toggle" onClick={this.handleToggle}>Answer</button></li>
        <li><button>Pass</button></li>
        <li><a>Downvote</a></li>
      </ul>
      <form className="hidden-form" onSubmit={this.handleSubmit}>
        <div>
          <div className="author-photo" />
          <div>
            <h4>{this.props.currentUser.username}</h4>
            <a>Add Bio</a>
          </div>
        </div>
        <ul className="form-style">
          <li><input type="file"
                     onChange={this.updateFile} /></li>
        </ul>
        <textarea className="answer-bio"
          onChange={this.handleChange("bio")}
          value={this.state.bio} />
        <textarea className="answer-input"
          onChange={this.handleChange("answer")}
          placeholder="Write your answer"
          value={this.state.answer} />
        <input type="submit" value="Submit" />
      </form>
      </article>
    );
  }
}

export default AnswerPageIndexItem;
