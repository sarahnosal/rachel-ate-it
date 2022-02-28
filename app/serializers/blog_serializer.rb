class BlogSerializer < ActiveModel::Serializer
  attributes :id, :name, :restaurant, :description, :post, :image

  has_many :comments
  has_many :users
  
end
