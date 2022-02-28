class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :score, :comment, :user_id

  belongs_to :user
  belongs_to :baked_good
end

