json.followedTopics @user_actions.select { |el| el.actionable_type == "Topic" }

json.followedUsers @user_actions.select { |el| el.actionable_type == "User" }

json.followedQuestions @user_actions.select { |el| el.actionable_type == "Question" && el.user_action == "follow" }

json.downvotedQuestions @user_actions.select {|el| el.actionable_type == "Question" && el.user_action == "downvote"}

json.passedQuestions @user_actions.select {|el| el.actionable_type == "Question" && el.user_action == "pass"}


json.upvotedAnswers @user_actions.select {|el| el.actionable_type == "Answer" && el.user_action == "upvote"}


json.downvotedAnswers @user_actions.select {|el| el.actionable_type == "Answer" && el.user_action == "downvote"}
