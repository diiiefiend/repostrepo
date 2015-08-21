class PostSub < ActiveRecord::Base
  validates :sub_id, :post_id, presence: true
  validates :sub_id, uniqueness: { scope: :post_id }

  belongs_to :sub
  belongs_to :post
end
