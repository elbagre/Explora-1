# == Schema Information
#
# Table name: answers
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  question_id        :integer          not null
#  body               :text             not null
#  upvotes            :integer          default(0)
#  downvotes          :integer          default(0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Answer < ActiveRecord::Base
  validates :author_id, :question_id, presence: true
  validates :body, length: { minimum: 20 }

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :question
  has_many :comments

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id
end
