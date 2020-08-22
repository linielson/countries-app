require 'rails_helper'

RSpec.describe 'Api::CountriesController', type: :request do
  let(:country) do
    Country.create!(name: 'Afghanistan', population: 11_111_111, acronym: 'AFG', timezones: ['UTC+04:30'],
                    currencies: [{ 'code' => 'Some code', 'name' => 'Some name', 'symbol' => 'x' }],
                    flag: 'https://restcountries.eu/data/afg.svg', regional_blocs: [{ 'acronym' => 'SAARC' }],
                    languages: [{ 'name' => 'Turkmen', 'nativeName' => 'Türkmen' }], capital: 'Kabul',
                    borders: %w[IRN PAK TKM UZB TJK CHN])
  end

  before { country }

  describe '#index' do
    before { get '/api/countries' }

    it 'renders the index template' do
      expect(response).to render_template('index')
    end

    it 'returns a list of countries' do
      expect(response).to be_successful
      expect(response.body).to include('Afghanistan')
    end
  end

  describe '#show' do
    before { get "/api/countries/#{country.id}" }

    it 'renders the show template' do
      expect(response).to render_template('show')
    end

    it 'returns a country' do
      expect(response).to be_successful
      expect(response.body).to include('Afghanistan')
    end
  end
end
