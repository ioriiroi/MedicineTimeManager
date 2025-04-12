class CreateMedicineLists < ActiveRecord::Migration[8.0]
  def change
    create_table :medicine_lists do |t|
      t.string :medicineName
      t.time :interval
      t.text :memo

      t.timestamps
    end
  end
end
