class Api::CountriesController < ApplicationController
  def index
    import_countries

    countries = Country.all

    if params[:filter].present?
      filter = "%#{params[:filter]}%"
      countries = countries.where('UPPER(name) LIKE UPPER(?)', filter)
                           .or(countries.where('UPPER(acronym) LIKE UPPER(?)', filter))
                           .or(countries.where('currencies @> ?', "[{\"code\": \"#{params[:filter].upcase}\"}]"))
    end

    @countries = countries
  end

  def show
    @country = Country.find(params[:id])
  end

  private

  def import_countries
    last_importation = REDIS.get('updated_after')

    if last_importation.blank? || can_import?(last_importation)
      ImportCountriesFromRestcountries.new.call
      REDIS.set('updated_after', Time.now)
    end
  end

  def can_import?(last_importation)
    Time.now > (last_importation.to_datetime + 30.minutes)
  end
end
