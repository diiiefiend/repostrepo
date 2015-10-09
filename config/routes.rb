Rails.application.routes.draw do
  root to: 'application#root'

  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create, :show, :index]

    resource :session, only: [:create, :show, :destroy]

    resources :subs

    resources :posts do
      post :upvote, on: :member
      post :downvote, on: :member
      post :clear_vote, on: :member
      member do
        resources :comments, only: [:create, :update, :show, :destroy, :new] do
          post :upvote, on: :member
          post :downvote, on: :member
          post :clear_vote, on: :member
        end
      end
    end

  end

end
