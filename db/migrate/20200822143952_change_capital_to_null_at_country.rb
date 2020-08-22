class ChangeCapitalToNullAtCountry < ActiveRecord::Migration[6.0]
  def change
    change_column_null :countries, :capital, true
  end
end
