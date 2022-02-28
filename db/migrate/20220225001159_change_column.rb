class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :reviews, :baked_goods_id, :baked_good_id
  end
end
