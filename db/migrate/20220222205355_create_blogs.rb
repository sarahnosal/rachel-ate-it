class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :name
      t.string :restaurant
      t.string :description
      t.string :post
      t.string :image
      t.timestamps
    end
  end
end
