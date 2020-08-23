class Api::CountriesController < ApplicationController
  def index
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
end
