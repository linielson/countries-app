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
    it 'renders the index template' do
      get '/api/countries'
      expect(response).to render_template('index')
    end

    it 'returns a list of countries' do
      get '/api/countries'
      expect(response).to be_successful
      expect(response.body).to include('Afghanistan')
    end

    context 'about filters' do
      let!(:another_country) do
        Country.create!(name: 'Angola', population: 206_135_893, acronym: 'AGO', timezones: ['UTC-03:00'],
                        currencies: [{ 'code' => 'AOA', 'name' => 'Angolan kwanza', 'symbol' => 'Kz' }],
                        flag: 'https://restcountries.eu/data/ago.svg', regional_blocs: [{ 'acronym' => 'AU' }],
                        languages: [{ 'name' => 'Portuguese', 'nativeName' => 'Português' }], capital: 'Luanda',
                        borders: %w[COG COD ZMB NAM])
      end

      context 'when filter by name' do
        it 'returns the corresponding country' do
          get '/api/countries', params: { filter: 'Afghanistan' }

          expect(response).to be_successful
          expect(response.body).to include('Afghanistan')
        end

        it 'ignores the case of filter' do
          get '/api/countries', params: { filter: 'AfGhAnIsTaN' }

          expect(response).to be_successful
          expect(response.body).to include('Afghanistan')
        end

        context 'whe filter part of name' do
          it 'returns the corresponding country' do
            get '/api/countries', params: { filter: 'Afgh' }

            expect(response).to be_successful
            expect(response.body).to include('Afghanistan')
          end
        end
      end

      context 'when filter by acronym' do
        it 'returns the corresponding country' do
          get '/api/countries', params: { filter: 'AGO' }

          expect(response).to be_successful
          expect(response.body).to include('Angola')
        end

        it 'ignores the case of filter' do
          get '/api/countries', params: { filter: 'AgO' }

          expect(response).to be_successful
          expect(response.body).to include('Angola')
        end

        context 'whe filter part of acronym' do
          it 'returns the corresponding country' do
            get '/api/countries', params: { filter: 'ag' }

            expect(response).to be_successful
            expect(response.body).to include('Angola')
          end
        end
      end

      context 'when filter by currency acronym' do
        it 'returns the corresponding country' do
          get '/api/countries', params: { filter: 'AOA' }

          expect(response).to be_successful
          expect(response.body).to include('Angola')
        end

        it 'ignores the case of filter' do
          get '/api/countries', params: { filter: 'AoA' }

          expect(response).to be_successful
          expect(response.body).to include('Angola')
        end

        it 'does not filter by part of acurrency acronym' do
          get '/api/countries', params: { filter: 'AO' }

          expect(response).to be_successful
          expect(response.body).not_to include('Angola')
        end
      end
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
