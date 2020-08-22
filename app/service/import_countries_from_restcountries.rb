require 'rest-client'

class ImportCountriesFromRestcountries
  def call
    response = RestClient.get 'https://restcountries.eu/rest/v2/all', { accept: :json }
    response.code
    # puts response.cookies
    # puts response.headers
    # puts response.body
  end
end
