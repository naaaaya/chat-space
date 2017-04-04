class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  mount_uploader :image, ImagesUploader
  validates :body, presence: true
end
