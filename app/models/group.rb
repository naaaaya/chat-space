class Group < ApplicationRecord
  has_many :users,through: :users_group
  has_many :users_group
  has_many :messages

  validates :name, presence: true
end
