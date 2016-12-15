import React from 'react';
import QuestionIndexItem from '../questions/question_index_item.jsx';
import AnswerPageIndexItem from '../answer_page/answer_page_index_item.jsx';
import { hashHistory } from 'react-router';

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
    this.refreshUserActions = this.refreshUserActions.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);
    this.changeFeed = this.changeFeed.bind(this);

    this.state = {
      content: "overview"
    };
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

  refreshUserActions() {
    this.props.requestUserActions();
  }

  handleClick(id) {
    return () => hashHistory.push(`/question/${id}`);
  }

  handleClass() {
    if (this.isFollowed()) {
      return "Following";
    } else {
      return "Follow";
    }
  }

  changeFeed(feed) {
    return () => { this.setState({ content: feed}); };
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
          <ul className="topic-nav">
            <li><a onClick={this.changeFeed("overview")}>Overview</a></li>
            <li><a onClick={this.changeFeed("answer")}>Answer</a></li>
            <li><button onClick={this.toggleFollow}
                        className={this.handleClass().toLowerCase()}
                        >{this.handleClass()}</button></li>
          </ul>
        </header>
      );
    }
  }

  filterQuestions() {
    const answerIds = this.props.downvotedAnswers.map( (downvote) => {
      return downvote.actionable_id;
    });

    return this.props.topic.questions.filter( (question) => {
      if (answerIds.indexOf(question.most_upvoted_answer.id) === -1) {
        return question;
      }
    });
  }

  questions(feed) {
    if (this.props.topic.questions && feed === "overview") {
      return (
        this.filterQuestions().map( (question, idx) => (
            <QuestionIndexItem question={question}
                               currentUser={this.props.currentUser}
                               requestAllComments={this.props.requestAllComments}
                               requestUserActions={this.props.requestUserActions}
                               upvotedAnswers={this.props.upvotedAnswers}
                               createUserAction={this.props.createUserAction}
                               destroyUserAction={this.props.destroyUserAction}
                               downvotedAnswers={this.props.downvotedAnswers}
                               refreshUserActions={this.refreshUserActions}
                               key={idx} />
          )
        )
      );
    } else if (this.props.topic.questions && feed === "answer") {
      return (
        this.filterQuestions().map((question, idx) => (
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
          )
        )
      );
    }
  }

  overview() {
    return(
      <div className="overview">
        <h4>Summary</h4>
        <p>{this.props.topic.description}</p>
        {this.questions("overview")}
      </div>
    );
  }

  answers() {
    return(
      this.questions("answer")
    );
  }

  pageContent() {
    if (this.state.content === "overview") {
      return this.overview();
    } else if (this.state.content === "answer") {
      return this.answers();
    }
  }

  render() {
    return (
      <div className="topic-home">
        {this.header()}
        <div className="topic-container">
          {this.pageContent()}
        </div>
      </div>
    );
  }
}

export default TopicHome;
