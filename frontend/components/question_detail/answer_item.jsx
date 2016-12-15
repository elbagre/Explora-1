import React from 'react';
import { merge } from 'lodash';
import CommentIndex from '../comments/comment_index_container.js';

class AnswerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "comments hidden",
    };
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {
    this.props.requestUserActions();
  }

  handleClick() {
    if (this.state.toggle !== "comments") {
      this.setState({
        toggle: "comments",
      });
      this.props.requestAllComments(this.props.answer.id);
    } else {
      this.setState({ toggle: "comments hidden"});
    }
  }

  image() {
    if (this.props.answer.image !== "/images/original/missing.png") {
      return (
        <div className="cover-photo">
          <img src={this.props.answer.image} />
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
        actionable_id: this.props.answer.id,
        actionable_type: "Answer",
        user_action: "upvote"
      });
    }
    this.props.requestUserActions();
  }

  upvoteId() {
    const idx = this.upvotedAnswerIds().indexOf(this.props.answer.id);
    return this.props.upvotedAnswers[idx].id;
  }

  isUpvoted() {
    if (this.upvotedAnswerIds().indexOf(this.props.answer.id) !== -1) {
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
        actionable_id: this.props.answer.id,
        actionable_type: "Answer",
        user_action: "downvote"
      });
    }
    this.props.refreshUserActions();
  }

  downvoteId() {
    const idx = this.downvotedAnswerIds().indexOf(this.props.answer.id);
    return this.props.downvotedAnswers[idx].id;
  }

  isDownvoted() {
    if (this.downvotedAnswerIds().indexOf(this.props.answer.id) !== -1) {
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
      <article className="detail-answer-box">
        <div className="detail-answer-header">
          <div className="author-photo" />
          <div>
            <h4>{this.props.answer.author}</h4>
          </div>
        </div>
        <div>
          {this.image()}
          <p>{this.props.answer.body}</p>
        </div>
        <ul className="question-links">
          <li><button className={this.handleUpvote().toLowerCase()}
                      onClick={this.toggleUpvote}
                      >{this.handleUpvote()}</button></li>
          <li><a className={this.handleDownvote()}
                 onClick={this.toggleDownvote}
                 >{this.handleDownvote()}</a></li>
          <li><a onClick={this.handleClick}>Comment</a></li>
        </ul>
        <CommentIndex toggle={this.state.toggle} answerId={this.props.answer.id} />
      </article>
    );
  }
}

export default AnswerItem;
