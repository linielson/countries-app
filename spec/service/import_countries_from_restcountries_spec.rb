require 'rails_helper'
require 'vcr'

RSpec.describe ImportCountriesFromRestcountries do
  describe '#call' do
    it 'imports countries from restCountries' do
      VCR.use_cassette('import_countries/success') do
        expect { ImportCountriesFromRestcountries.new.call }.to change(Country, :count).by(250)
      end
    end

    context 'when the country already exist' do
      let!(:existing_country) do
        country = Country.new
        country.name = 'Afghanistan'
        country.population = 11_111_111
        country.currencies = [{ 'code' => 'Some code', 'name' => 'Some name', 'symbol' => 'x' }]
        country.acronym = 'AFG'
        country.flag = 'https://restcountries.eu/data/afg.svg'
        country.regional_blocs = [{ 'acronym' => 'SAARC' }]
        country.timezones = ['UTC+04:30']
        country.languages = [{ 'name' => 'Turkmen', 'nativeName' => 'Türkmen' }]
        country.capital = 'Kabul'
        country.borders = %w[IRN PAK TKM UZB TJK CHN]
        country.save!
        country
      end

      let(:call) do
        VCR.use_cassette('import_countries/success-update-country') do
          ImportCountriesFromRestcountries.new.call
        end
      end

      it 'updates the country population' do
        expect { call }.to change { existing_country.reload.population }.from(11_111_111).to(27_657_145)
      end

      it 'updates the country currencies' do
        expect { call }.to change { existing_country.reload.currencies }
          .from([{ 'code' => 'Some code', 'name' => 'Some name', 'symbol' => 'x' }])
          .to([{ 'code' => 'AFN', 'name' => 'Afghan afghani', 'symbol' => '؋' }])
      end
    end

    context 'when restCountries does not return success' do
      it 'does not import countries' do
        VCR.use_cassette('import_countries/fail') do
          expect { ImportCountriesFromRestcountries.new.call }.not_to change(Country, :count)
        end
      end
    end
  end
end
