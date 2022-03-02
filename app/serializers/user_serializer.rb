class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name

  has_many :reviews
  has_many :baked_goods
  has_many :comments
  has_many :blogs
end
