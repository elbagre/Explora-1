import React from 'react';
import QuestionIndexItem from './question_index_item.jsx';

class QuestionIndex extends React.Component {
  componentDidMount() {
    this.props.requestAllQuestions();
  }

  render() {
    const questions = this.props.questions.map((question, idx) => (
      <QuestionIndexItem question={question}
                         requestAllComments={this.props.requestAllComments}
                         key={idx} />
    ));
    return (
      <div className="question-index">
        <h4>Top Explorations For You</h4>
        <ul className="question-list">
          {questions}
        </ul>
      </div>
    );
  }
}

export default QuestionIndex;
