class DropLocations < ActiveRecord::Migration[6.1]
  def change
    drop_table :subscriptions
    drop_table :users
  end
end
