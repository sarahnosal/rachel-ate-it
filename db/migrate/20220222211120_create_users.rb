class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'citext'

    create_table :users do |t|
      t.citext :username
      t.string :name
      t.string :password_digest
      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
