Rails.application.routes.draw do
  # resources :medicine_lists do
  #   member do
  #     put :update_timestamp
  #   end
  # end
  

  # api
  namespace :api do
    resources :medicines
  end

  # erb
  resources :medicines

  # Defines the root path route ("/")
  # root "posts#index"
  root "medicines#index"
end
