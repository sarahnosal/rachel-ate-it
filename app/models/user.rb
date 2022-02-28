class User < ApplicationRecord

    has_secure_password

    has_many :reviews
    has_many :baked_goods, through: :reviews
    accepts_nested_attributes_for :baked_goods, allow_destroy: true

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
end
