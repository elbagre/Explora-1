# == Schema Information
#
# Table name: tag_topics
#
#  id          :integer          not null, primary key
#  topic_id    :integer          not null
#  question_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TagTopic < ActiveRecord::Base
  validates :question_id, :topic_id, presence: true

  belongs_to :question
  belongs_to :topic
end
