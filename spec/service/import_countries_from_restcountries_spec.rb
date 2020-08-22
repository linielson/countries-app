require 'rails_helper'
require 'vcr'

RSpec.describe ImportCountriesFromRestcountries do
  describe '#call' do
    it 'imports countries from restCountries' do
      imported_data = ''

      VCR.use_cassette('import_countries/success') do
        imported_data = ImportCountriesFromRestcountries.new.call
      end

      expect(imported_data).to eql 200
    end

    context 'when the country already exist' do
      it 'updates the country population' do

      end

      it 'updates the country currencies' do

      end
    end

    context 'when restCountries return unprocessable entity' do

    end
  end
end
