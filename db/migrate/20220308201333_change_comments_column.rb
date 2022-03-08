class ChangeCommentsColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :comments, :comment, :bcomment
  end
end
