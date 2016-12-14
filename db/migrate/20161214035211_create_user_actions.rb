class CreateUserActions < ActiveRecord::Migration
  def change
    create_table :user_actions do |t|
      t.integer :user_id, null: false
      t.integer :actionable_id, null: false
      t.string :actionable_type, null: false
      t.string :user_action, null: false

      t.timestamps null: false
    end
    add_index :user_actions, [:user_id, :actionable_id]
  end
end
