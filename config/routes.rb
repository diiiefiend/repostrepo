Rails.application.routes.draw do
  resource :user, only: [:new, :create, :show]

  resource :session, only: [:new, :create] do
    member do
      get 'destroy', as: 'delete'
    end
  end

  resources :subs

  resources :posts, except: :index do
    resources :comments, only: :new, on: :member

    post :upvote, on: :member
    post :downvote, on: :member
  end

  resources :comments, only: [:create, :show] do
    post :upvote, on: :member
    post :downvote, on: :member
  end

  root to: redirect('/subs')
end
