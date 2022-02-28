class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :score, :comment, :user_id, :user, :baked_good_id

  has_one :user
  has_one :baked_good

  def user
    object.user.name
  end
end

