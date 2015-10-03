class Sub < ActiveRecord::Base
  validates :title, :description, :user_id, presence: true
  after_save :set_stamp

  belongs_to :mod,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :posts,
    through: :post_subs,
    source: :post

  has_many :post_subs, dependent: :destroy

  def set_stamp
    self.update_columns(last_activity_stamp: self.updated_at)
  end
end
