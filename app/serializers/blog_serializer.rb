class BlogSerializer < ActiveModel::Serializer
  attributes :id, :name, :restaurant, :description, :post, :image
end
