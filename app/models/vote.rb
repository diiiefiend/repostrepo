class Vote < ActiveRecord::Base
  validates :value, presence: true, inclusion: { in: [-1, 1] }
  validates :user_id, presence: true
  belongs_to :votable, polymorphic: true

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

end
