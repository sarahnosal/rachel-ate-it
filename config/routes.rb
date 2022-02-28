Rails.application.routes.draw do
  
  resources :reviews
  resources :users, only: [:index, :create, :destroy]
  resources :baked_goods do
    resources :reviews
  end
  resources :blogs
  post '/signup', to: 'users#create'
  get 'me', to: 'users#me'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
