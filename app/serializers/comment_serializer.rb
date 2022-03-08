class CommentSerializer < ActiveModel::Serializer
  attributes :id, :bcomment, :user_id, :user, :blog_id, :blog, :image

  has_one :user
  has_one :blog

  def user
    object.user.name
  end

  def blog
    object.blog.name
  end

  def image
    object.blog.image
  end
  
end
