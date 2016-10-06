# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all
guest = User.create!(username: "guest", email: "guest@guest.com", password: "guests")
one = User.create!(username: "Man McMann", email: "man@gmail.com", password: "password")
two = User.create!(username: "Billy DaBillyo", email: "billy@gmail.com", password: "password")
three = User.create!(username: "Shira Nye", email: "shira@gmail.com", password: "password")
four = User.create!(username: "Ken Sabe", email: "ken@gmail.com", password: "password")
five = User.create!(username: "Yono Saey", email: "yono@gmail.com", password: "password")
six = User.create!(username: "Jean Sepas", email: "jean@gmail.com", password: "password")
seven = User.create!(username: "Hama Viado", email: "hama@gmail.com", password: "password")
eight = User.create!(username: "John Smith", email: "john@gmail.com", password: "password")
nine = User.create!(username: "Roger O'Shae", email: "roger@gmail.com", password: "password")
ten = User.create!(username: "Sarah McClintock", email: "sarah@gmail.com", password: "password")
eleven = User.create!(username: "Natsuko Yamashita", email: "natsuko@gmail.com", password: "password")
twelve = User.create!(username: "Tian Wu", email: "tian@gmail.com", password: "password")
thirteen = User.create!(username: "Alexandra Garcia", email: "alexandra@gmail.com", password: "password")
fourteen = User.create!(username: "Charlotte Raquet", email: "charlotte@gmail.com", password: "password")
fifteen = User.create!(username: "Salim Mohammad", email: "salim@gmail.com", password: "password")
sixteen = User.create!(username: "Giorgio Roo", email: "giorgio@gmail.com", password: "password")
seventeen = User.create!(username: "Marie DuChamps", email: "marie@gmail.com", password: "password")
eighteen = User.create!(username: "Katie Van Den Born", email: "katie@gmail.com", password: "password")
nineteen = User.create!(username: "Elizabeth Baker", email: "elizabeth@gmail.com", password: "password")
twenty = User.create!(username: "Nadia Sevrain", email: "nadia@gmail.com", password: "password")

Question.destroy_all
q_one = Question.create!(title: "When are the best times to visit Japan?", description: "I plan to visit within the next year.", author_id: one.id)
q_two = Question.create!(title: "What's the best food to try in Peru?", description: "Not a big fan of meat, but will eat fish.", author_id: two.id)
q_three = Question.create!(title: "What are the best countries to visit in the world?", description: "My favorites are Colombia and Japan.", author_id: three.id)
q_four = Question.create!(title: "What is the recommended tip in the States?", description: "Will be travelling to NYC for business and I'm not sure how much to tip.", author_id: four.id)
q_five = Question.create!(title: "What are some reasonable places to stay in London?", description: "Looking for something under $100 a night.", author_id: five.id)

Answer.destroy_all
a_one = Answer.create!(body: "Probably around Sakura season. Sakura season occurs sometime early in May or April. The Japanese government usually announces dates in advance, that's how important it is for Japanese people.", author_id: two.id, question_id: q_one.id)
a_two = Answer.create!(body: "So many things to try. Even if you don't like fish, you should give ceviche a try. There are many different kinds and you are sure to find one you like.", author_id: one.id, question_id: q_two.id)
a_three = Answer.create!(body: "I hear Cambodia and Thailand are unforgettable. From my personal experience, Italy and Japan are among the most amazing places I have been to in my life.", author_id: one.id, question_id: q_three.id)
a_four = Answer.create!(body: "You should always aim to tip around 18% when seated at a restaurant. If you are at a bar or being serviced in some other way, 10% tip is acceptable..", author_id: one.id, question_id: q_four.id)
a_five = Answer.create!(body: "You won't be able to stay in London for under a hundred dollars a night, sorry.", author_id: one.id, question_id: q_five.id)
