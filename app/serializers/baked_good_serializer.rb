class BakedGoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image

  has_many :reviews
  has_many :users
end
