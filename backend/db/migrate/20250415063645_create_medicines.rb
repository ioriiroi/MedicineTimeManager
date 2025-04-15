class CreateMedicines < ActiveRecord::Migration[8.0]
  def change
    create_table :medicines do |t|
      t.string :name
      t.integer :hour
      t.integer :minute
      t.integer :second
      t.string :memo

      t.timestamps
    end
  end
end
