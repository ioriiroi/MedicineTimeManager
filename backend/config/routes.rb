Rails.application.routes.draw do
  # api
  namespace :api do
    resources :medicines
  end
end
