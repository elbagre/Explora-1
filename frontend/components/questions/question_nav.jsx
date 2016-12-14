import React from 'react';

const QuestionNav = ({ toggle, toggleUpvote, toggleDownvote, handleUpvote }) => (
  <div className="question-nav">
    <ul className="question-links">
      <li><button className={handleUpvote().toLowerCase()}
                  onClick={toggleUpvote}
                  >{handleUpvote()}</button></li>
      <li><a onClick={toggleDownvote}>Downvote</a></li>
      <li><a onClick={toggle}>Comment</a></li>
    </ul>
  </div>
);

export default QuestionNav;
