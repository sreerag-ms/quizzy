# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @attempts = Attempt.where(submitted: true).eager_load([:user, :quiz]).where(
      quiz: { user_id: @current_user.id })
  end
end
