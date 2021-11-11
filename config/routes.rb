# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: [:create, :destroy]
    resources :quizzes, except: [:new, :edit]
    resources :questions, only: [:create]

  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
