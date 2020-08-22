namespace :countries_app do
  desc 'Imports countries information from https://restcountries.eu/'

  task import_countries: :environment do
    puts "Test...#{Time.now}"
  end
end
