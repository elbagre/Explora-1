class UserAction < ActiveRecord::Base
  validates :user_id, :actionable_id, :actionable_type, :user_action, presence: true
  validates :user_id, uniqueness: { scope: [:actionable_id, :actionable_type, :user_action]}

  belongs_to :user

  belongs_to :actionable,
    polymorphic: true
end
