class Country < ApplicationRecord
  validates :name,
            presence: true

  validates :currencies,
            presence: true

  validates :acronym,
            presence: true

  validates :flag,
            presence: true

  validates :population,
            presence: true,
            numericality: { greater_than_or_equal_to: 0 }

  validates :timezones,
            presence: true

  validates :languages,
            presence: true
end
