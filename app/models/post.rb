class Post < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :post_subs, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :subs,
  through: :post_subs,
  source: :sub
end
