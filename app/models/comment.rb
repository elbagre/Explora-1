# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  answer_id  :integer          not null
#  body       :text             not null
#  upvotes    :integer          default(0)
#  downvotes  :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :author_id, :answer_id, :body, presence: true

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id

  belongs_to :answer
end
