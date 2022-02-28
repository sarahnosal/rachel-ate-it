class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :baked_goods_id
      t.string :comment
      t.integer :score
      t.timestamps
    end
  end
end
