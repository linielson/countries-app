class ChangeBordersToNullAtCountry < ActiveRecord::Migration[6.0]
  def change
    change_column_null :countries, :borders, true
  end
end
