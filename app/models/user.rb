class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many :modded_subs,
    class_name: "Sub",
    foreign_key: :user_id,
    primary_key: :id

  has_many :posts,
    class_name: "Post",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :votes,
    class_name: "Vote",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :comments, dependent: :destroy

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = self.class.generate_token
    self.save!
    session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_token
  end
end
