class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :score, :comment, :user_id, :user, :baked_good_id, :baked_good, :image

  has_one :user
  has_one :baked_good

  def user
    object.user.name
  end

  def baked_good
    object.baked_good.name
  end

  def image
    object.baked_good.image
  end
end

