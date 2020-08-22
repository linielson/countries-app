class Country < ApplicationRecord
  validates :name,
            presence: true

  validates :currencies,
            presence: true

  validates :acronym,
            presence: true

  validates :flag,
            presence: true

  validates :regional_blocs,
            presence: true

  validates :population,
            presence: true,
            numericality: { greater_than: 0 }

  validates :timezones,
            presence: true

  validates :languages,
            presence: true

  validates :capital,
            presence: true

  validates :borders,
            presence: true
end
