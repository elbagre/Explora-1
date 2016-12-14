import React from 'react';
import QuestionNav from './question_nav.jsx';
import CommentIndex from '../comments/comment_index_container.js';
import { hashHistory } from 'react-router';

class QuestionIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: "comments hidden"};
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.image = this.image.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.toggleUpvote = this.toggleUpvote.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
    this.upvoteId = this.upvoteId.bind(this);
    this.downvoteId = this.downvoteId.bind(this);
    this.isUpvoted = this.isUpvoted.bind(this);
    this.isDownvoted = this.isDownvoted.bind(this);
    this.upvotedAnswerIds = this.upvotedAnswerIds.bind(this);
    this.downvotedAnswerIds = this.downvotedAnswerIds.bind(this);
  }

  handleClick(id) {
    return () => hashHistory.push(`/question/${id}`);
  }

  toggle() {
    if (this.state.toggle === "comments") {
      this.setState({ toggle: "comments hidden"});
    } else {
      this.setState({ toggle: "comments"});
      this.props.requestAllComments(this.props.question.most_upvoted_answer.id);
    }
  }

  image() {
    if (this.props.question.image !== "/images/original/missing.png") {
      return (
        <div className="cover-photo">
          <img src={this.props.question.image} />
        </div>
      );
    }
  }

  handleUpvote() {
    if (this.isUpvoted()) {
      return "Upvoted";
    } else {
      return "Upvote";
    }
  }

  toggleUpvote() {
    if (this.isUpvoted()) {
      this.props.destroyUserAction(this.upvoteId());
    } else {
      this.props.createUserAction({
        user_id: this.props.currentUser.id,
        actionable_id: this.props.question.most_upvoted_answer.id,
        actionable_type: "Answer",
        user_action: "upvote"
      });
    }
    this.props.requestUserActions();
  }

  upvoteId() {
    const idx = this.upvotedAnswerIds().indexOf(this.props.question.most_upvoted_answer.id);
    return this.props.upvotedAnswers[idx].id;
  }

  isUpvoted() {
    if (this.upvotedAnswerIds().indexOf(this.props.question.most_upvoted_answer.id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  upvotedAnswerIds() {
    return this.props.upvotedAnswers.map( (upvote) => {
      return upvote.actionable_id;
    });
  }

  handleDownvote() {
    if (this.isDownvoted()) {
      return "downvoted";
    } else {
      return "detail-answer-box";
    }
  }

  toggleDownvote() {
    if (this.isDownvoted()) {
      this.props.destroyUserAction(this.downvoteId());
    } else {
      this.props.createUserAction({
        user_id: this.props.currentUser.id,
        actionable_id: this.props.question.most_upvoted_answer.id,
        actionable_type: "Answer",
        user_action: "downvote"
      });
    }
    this.props.refreshUserActions();
  }

  downvoteId() {
    const idx = this.downvotedAnswerIds().indexOf(this.props.question.most_upvoted_answer.id);
    return this.props.downvotedAnswers[idx].id;
  }

  isDownvoted() {
    if (this.downvotedAnswerIds().indexOf(this.props.question.most_upvoted_answer.id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  downvotedAnswerIds() {
    return this.props.downvotedAnswers.map( (downvote) => {
      return downvote.actionable_id;
    });
  }

  render() {
    return (
      <li className="question-box">
        <h3 onClick={this.handleClick(this.props.question.id)}
          className="question-title">{this.props.question.title}</h3>
        <div>
          {this.image()}
          <div>
            <h4 className="question-author">{this.props.question.most_upvoted_author}</h4>
            <p className="question-answer">{this.props.question.most_upvoted_answer.body}</p>
          </div>
        </div>
        <QuestionNav toggle={this.toggle}
                     toggleUpvote={this.toggleUpvote}
                     toggleDownvote={this.toggleDownvote}
                     handleUpvote={this.handleUpvote}/>
        <CommentIndex toggle={this.state.toggle} answerId={this.props.question.most_upvoted_answer.id} />
      </li>
    );
  }
}

export default QuestionIndexItem;
