class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :groups, through: :users_groups
has_many :users_groups
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
