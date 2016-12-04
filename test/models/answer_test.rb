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

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
