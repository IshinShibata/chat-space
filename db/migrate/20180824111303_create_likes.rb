class CreateLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :likes do |t|
      t.references :message, null: false, foreign_key: true
      t.references :user, null: false, foregin_key: true
      t.timestamps
    end
  end
end
