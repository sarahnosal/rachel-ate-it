class Review < ApplicationRecord
    belongs_to :user
    belongs_to :baked_good
end
