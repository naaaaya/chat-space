class Group < ApplicationRecord
  has_many :users,through: :users_group
  has_many :users_group
  accepts_nested_attributes_for :users
end
