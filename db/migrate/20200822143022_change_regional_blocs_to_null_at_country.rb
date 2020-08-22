class ChangeRegionalBlocsToNullAtCountry < ActiveRecord::Migration[6.0]
  def change
    change_column_null :countries, :regional_blocs, true
  end
end
