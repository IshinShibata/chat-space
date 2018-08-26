class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :likes, dependent: :destroy
  mount_uploader :image, ImageUploader
  validates :content, presence: true, unless: :image?

  def like_user(user_id)
   likes.find_by(user_id: user_id)
  end

end
