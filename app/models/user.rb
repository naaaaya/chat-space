class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :groups, through: :users_group
has_many :users_group
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
