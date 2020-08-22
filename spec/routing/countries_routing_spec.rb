require 'rails_helper'

describe 'routing to countries' do
  it 'routes to countries#index' do
    expect(get: 'api/countries').to route_to(format: :json, controller: 'api/countries', action: 'index')
  end

  it 'routes to countries#show' do
    expect(get: 'api/countries/1').to route_to(format: :json, controller: 'api/countries', action: 'show', id: '1')
  end

  it 'does not routes to countries#create' do
    expect(post: 'api/countries').not_to be_routable
  end

  it 'does not routes countries#edit' do
    expect(post: 'api/countries/1/edit').not_to be_routable
  end

  it 'does not routes countries#update' do
    expect(put: 'api/countries/1').not_to be_routable
  end

  it 'does not routes countries#destroy' do
    expect(delete: 'api/countries/1').not_to be_routable
  end
end
