json.followedTopics @user_actions.select { |el| el.actionable_type == "Topic" }

json.followedUsers @user_actions.select { |el| el.actionable_type == "User" }

json.followedQuestions @user_actions.select do |el|
  el.actionable_type == "Question" && el.user_action == "follow"
end

json.downvotedQuestions @user_actions.select do |el|
  el.actionable_type == "Question" && el.user_action == "downvote"
end

json.passedQuestions @user_actions.select do |el|
  el.actionable_type == "Question" && el.user_action == "pass"
end

json.upvotedAnswers @user_actions.select do |el|
  el.actionable_type == "Answer" && el.user_action == "upvote"
end

json.downvotedAnswers @user_actions.select do |el|
  el.actionable_type == "Answer" && el.user_action == "downvote"
end
