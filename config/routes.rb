Rails.application.routes.draw do
  resource :user, only: [:new, :create, :show]

  resource :session, only: [:new, :create] do
    member do
      get 'destroy', as: 'delete'
    end
  end

  resources :subs

  resources :posts, except: :index

  root to: redirect('/subs')
end
