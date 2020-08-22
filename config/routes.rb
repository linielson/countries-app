Rails.application.routes.draw do
  root 'pages#index'
  namespace :api, defaults: { format: :json } do
    resources :countries, only: %i[index show]
  end
end
