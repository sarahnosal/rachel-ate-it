class BakedGoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image
end
