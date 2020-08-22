namespace :countries_app do
  desc 'Imports countries information'

  task import_countries: :environment do
    puts 'Start importation'
    ImportCountriesFromRestcountries.new.call
    puts 'Finish importation'
  end
end
