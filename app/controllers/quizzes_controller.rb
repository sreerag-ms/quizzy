# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:update, :destroy, :show]

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: t("quiz.successful_save") }
    else
      render status: 422, json: { notice: t("quiz.failed_save") }
    end
  end

  def index
    @quizzes = policy_scope(Quiz)
  end

  def update
    authorize @quiz
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: t("quiz.successful_update") }
    else
      render status: 422, json: { notice: t("quiz.failed_update") }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.successful_delete") }
    else
      render status: 422, json: { notice: t("quiz.failed_delete") }
    end
  end

  def show
    authorize @quiz
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
      unless @quiz
        render status: 404, json: { notice: t("quiz.not_found") }
      end
    end
end
