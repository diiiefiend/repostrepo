class Comment < ActiveRecord::Base
  validates :content, :user_id, :post_id, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id,
    dependent: :destroy

  belongs_to :post
end
