class User < ApplicationRecord

    has_secure_password

    has_many :reviews
    has_many :baked_goods, through: :reviews
    accepts_nested_attributes_for :baked_goods, allow_destroy: true

    has_many :comments
    has_many :blogs, through: :comments

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
end
