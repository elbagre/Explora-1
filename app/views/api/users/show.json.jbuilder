json.partial! "api/users/user", user: @user

json.answers @answers.each do |answer|
  json.author answer.author.username
  json.body answer.body
  json.id answer.id
  json.image asset_path(answer.image.url)
end

json.questions @questions.each do |question|
  json.title question.title
  json.id question.id
end
