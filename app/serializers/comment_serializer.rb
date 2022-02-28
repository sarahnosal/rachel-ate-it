class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :user, :blog_id

  has_one :user
  has_one :blog

  def user
    object.user.name
  end
  
end
