# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Quiz saved successfully" }
    else
      render status: 422, json: { notice: "Could not create quiz" }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
