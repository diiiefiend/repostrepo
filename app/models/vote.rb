class Vote < ActiveRecord::Base
  validates :value, presence: true, inclusion: { in: [-1, 1] }
  belongs_to :votable, polymorphic: true

end
