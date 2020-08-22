class CreateCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :countries do |t|
      t.string  :name, null: false
      t.jsonb   :currencies, null: false
      t.string  :acronym, null: false
      t.string  :flag, null: false
      t.jsonb   :regional_blocs, null: false
      t.integer :population, null: false
      t.jsonb   :timezones, null: false
      t.jsonb   :languages, null: false
      t.string  :capital, null: false
      t.jsonb   :borders, null: false

      t.timestamps
    end
  end
end
