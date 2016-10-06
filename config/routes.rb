Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :questions, only: [:create, :index, :show, :destroy] do
      resources :answers, only: [:index]
    end
    resources :answers, only: [:show, :create, :destroy]
  end
end
