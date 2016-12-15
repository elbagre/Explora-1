import React from 'react';
import AnswerPageIndexItem from './answer_page_index_item.jsx';

class AnswerPage extends React.Component {
  constructor(props) {
    super(props);
    this.refreshUserActions = this.refreshUserActions.bind(this);
    this.unansweredQuestions = this.unansweredQuestions.bind(this);
  }

  componentDidMount() {
    this.props.requestAllQuestions();
    this.props.requestUserActions();
  }

  refreshUserActions() {
    this.props.requestUserActions();
  }

  unansweredQuestions() {
    const passedIds = this.props.passedQuestions.map( (pass) => {
      return pass.actionable_id;
    });

    const downvotedIds = this.props.downvotedQuestions.map( (downvote) => {
      return downvote.actionable_id;
    });

    return this.props.questions.filter( (question) => {
      if (passedIds.indexOf(question.id) === -1 && downvotedIds.indexOf(question.id) === -1) {
        return question;
      }
    });
  }

  render() {
    const unansweredQuestions = this.unansweredQuestions().filter( (question) => {
      if (question.answer_count < 5) {
        return (question);
      }
    });

    const answerableQuestions = unansweredQuestions.map( (question, idx) => {
      return(
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
      );
    });

    return(
      <section className="answer-index">
        <h4 className="question-header">Can you answer these questions?</h4>
        {answerableQuestions}
      </section>
    );
  }
}

export default AnswerPage;
