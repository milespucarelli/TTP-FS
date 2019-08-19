class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.decimal :balance, precision: 17, scale: 2, default: 5000.00

      t.timestamps
    end
  end
end
