import React from 'react';
import AnswerItem from './answer_item.jsx';
import AnswerForm from './answer_form.jsx';

class QuestionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.isFollowed = this.isFollowed.bind(this);
    this.followedQuestionIds = this.followedQuestionIds.bind(this);
    this.followId = this.followId.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.downvoteId = this.downvoteId.bind(this);
    this.downvotedQuestionIds = this.downvotedQuestionIds.bind(this);
    this.isDownvoted = this.isDownvoted.bind(this);
    this.toggleDownvote = this.toggleDownvote.bind(this);
    this.answers = this.answers.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleQuestion(this.props.id);
    this.props.requestUserActions();
  }

  componentWillReceiveProps(newProps) {
    if (parseInt(newProps.params.id) !== this.props.question.id) {
      this.props.fetchSingleQuestion(this.props.id);
    }
  }

  handleFollow() {
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
        actionable_id: this.props.question.id,
        actionable_type: "Question",
        user_action: "follow"
      });
    }
    this.props.requestUserActions();
  }

  followId() {
    const idx = this.followedQuestionIds().indexOf(this.props.question.id);
    return this.props.follows[idx].id;
  }

  isFollowed() {
    if (this.followedQuestionIds().indexOf(this.props.question.id) !== -1) {
      return true;
    } else {
      return false;
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
    this.props.requestUserActions();
  }

  handleDownvote() {
    if (this.isDownvoted()) {
      return "Downvoted";
    } else {
      return "Downvote";
    }
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

  followedQuestionIds() {
    return this.props.follows.map( (follow) => {
      return follow.actionable_id;
    });
  }

  downvotedQuestionIds() {
    return this.props.downvotedQuestions.map( (downvote) => {
      return downvote.actionable_id;
    });
  }

  answers() {
    const answerIds = this.props.downvotedAnswers.map( (downvote) => {
      return downvote.actionable_id;
    });
    return this.props.question.answers.filter( (answer) => {
      if (answerIds.indexOf(answer.id)) {
        return answer;
      }
    });
  }

  render() {
    const answers = this.answers().map( (answer, idx) => (
      <AnswerItem
        answer={answer}
        downvotedAnswers={this.props.downvotedAnswers}
        upvotedAnswers={this.props.upvotedAnswers}
        createUserAction={this.props.createUserAction}
        destroyUserAction={this.props.destroyUserAction}
        requestUserActions={this.props.requestUserActions}
        requestAllComments={this.props.requestAllComments}
        key={idx} />
    ));

    return(
      <div className="question-detail">
        <header>
          <h2>{this.props.question.title}</h2>
          <p>{this.props.question.description}</p>
          <ul className="detail-links">
            <li><a onClick={this.toggleFollow}>{this.handleFollow()}</a></li>
            <li><a onClick={this.toggleDownvote}>{this.handleDownvote()}</a></li>
          </ul>
        </header>
        <AnswerForm
          currentUser={this.props.currentUser}
          id={this.props.id}
          createAnswer={this.props.createAnswer}/>
        <section className="answer-index">
          <h4>{answers.length} Answers</h4>
          {answers}
        </section>
      </div>
    );
  }
}

export default QuestionDetail;
