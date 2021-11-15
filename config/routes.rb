# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: [:create, :destroy]
    resources :quizzes, except: [:new, :edit]
    resources :questions, only: [:create, :update, :destroy]

    namespace :public do
      resources :quizzes, only: [ :show], param: :slug
    end

  end

  post "/quizzes/:id/publish", to: "quizzes#publish"
  post "/quizzes/:id/unpublish", to: "quizzes#unpublish"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
