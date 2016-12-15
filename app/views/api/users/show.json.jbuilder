json.partial! "api/users/user", user: @user

json.answers @answers.each do |answer|
  json.author answer.author.username
  json.question answer.question.title
  json.questionId answer.question.id
  json.body answer.body
  json.id answer.id
  json.image asset_path(answer.image.url)
end

json.questions @questions.each do |question|
  json.title question.title
  json.id question.id
  json.answer_count question.answers.length
end
