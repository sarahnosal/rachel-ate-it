class CreateBakedGoods < ActiveRecord::Migration[6.1]
  def change
    create_table :baked_goods do |t|
      t.string :name
      t.integer :price
      t.string :image
      t.string :description
      t.timestamps
    end
  end
end
