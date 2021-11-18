# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @attempts = Attempt.where(submitted: true).eager_load(:quiz).where(
      "quizzes.user_id = ?",
      @current_user.id).eager_load(:user)
  end
end
