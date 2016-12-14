import React from 'react';
import QuestionIndexItem from './question_index_item.jsx';

class QuestionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.questions = this.questions.bind(this);
    this.refreshUserActions = this.refreshUserActions.bind(this);
  }
  componentDidMount() {
    this.props.requestAllQuestions();
    this.props.requestUserActions();
  }

  refreshUserActions() {
    this.props.requestUserActions();
  }

  questions() {
    const answerIds = this.props.downvotedAnswers.map( (answer) => {
      return answer.actionable_id;
    });

    return this.props.questions.filter( (question) => {
      if (answerIds.indexOf(question.most_upvoted_answer.id) === -1) {
        return question;
      }
    });
  }

  render() {
    const filteredQuestions = this.questions().map((question, idx) => (
      <QuestionIndexItem question={question}
                         currentUser={this.props.currentUser}
                         requestAllComments={this.props.requestAllComments}
                         requestUserActions={this.props.requestUserActions}
                         downvotedAnswers={this.props.downvotedAnswers}
                         upvotedAnswers={this.props.upvotedAnswers}
                         createUserAction={this.props.createUserAction}
                         destroyUserAction={this.props.destroyUserAction}
                         refreshUserActions={this.refreshUserActions}
                         key={idx} />
    ));

    return (
      <div className="question-index">
        <h4>Top Explorations For You</h4>
        <ul className="question-list">
          {filteredQuestions}
        </ul>
      </div>
    );
  }
}

export default QuestionIndex;
