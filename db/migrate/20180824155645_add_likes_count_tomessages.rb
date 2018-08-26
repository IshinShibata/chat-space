class AddLikesCountTomessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :likes_count, :integer
  end
end
