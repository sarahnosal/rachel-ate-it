class Review < ApplicationRecord
    belongs_to :user
    belongs_to :baked_good

    validates :score, :comment, :user_id, :baked_good_id, presence: true
    validates :score, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 5}
end
