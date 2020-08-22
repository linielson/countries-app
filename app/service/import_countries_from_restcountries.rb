require 'rest-client'

class ImportCountriesFromRestcountries
  def call
    RestClient.get('https://restcountries.eu/rest/v2/all', { accept: :json }) do |response|
      if response.code == 200
        JSON.parse(response.body).each do |response_country|
          country = Country.find_by(acronym: response_country['alpha3Code'])

          if country.present?
            update_country(country, response_country)
          else
            create_country(response_country)
          end
        end
      end
    end
  end

  private

  def update_country(country, response_country)
    country.currencies = response_country['currencies']
    country.population = response_country['population']
    country.save! if country.valid?
  end

  def create_country(response_country)
    country = Country.new
    country.name = response_country['name']
    country.currencies = response_country['currencies']
    country.acronym = response_country['alpha3Code']
    country.flag = response_country['flag']
    country.regional_blocs = response_country['regionalBlocs']
    country.population = response_country['population']
    country.timezones = response_country['timezones']
    country.languages = response_country['languages']
    country.capital = response_country['capital']
    country.borders = response_country['borders']
    country.save! if country.valid?
  end
end
