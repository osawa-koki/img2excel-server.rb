Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    match '/greet', to: 'greetings#index', via: [:get, :post, :patch, :put, :delete]
    get '/hello/:name', to: 'hello#index'

    get '/user', to: 'user#get'
    post '/user', to: 'user#post'
    put '/user/:id', to: 'user#put'
    delete '/user/:id', to: 'user#delete'
  end

  mount ActionCable.server => '/cable'
end
