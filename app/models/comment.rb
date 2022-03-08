class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :blog

    validates :bcomment, :user_id, :blog_id, presence: true

end
