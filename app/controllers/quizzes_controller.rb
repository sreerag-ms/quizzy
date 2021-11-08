# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:update, :destroy]

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Quiz saved successfully" }
    else
      render status: 422, json: { notice: "Could not create quiz" }
    end
  end

  def index
    @quizzes = Quiz.all
    puts "quizzes: #{@quizzes}"
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Quiz updated successfully" }
    else
      render status: 422, json: { notice: "Could not update quiz" }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Quiz deleted successfully" }
    else
      render status: 422, json: { notice: "Could not delete quiz" }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
    end
end
