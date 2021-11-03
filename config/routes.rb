# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: :create

  end

end
