class User < ApplicationRecord

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true

    has_many :reviews
    has_many :baked_goods, through: :reviews
end
