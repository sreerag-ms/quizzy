# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:update, :destroy, :show, :publish, :unpublish]

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    authorize quiz
    if quiz.save!
      render status: :ok, json: { notice: t("quiz.successful_save") }
    else
      render status: :unprocessable_entity, json: { notice: t("quiz.failed_save") }
    end
  end

  def index
    @quizzes = policy_scope(Quiz)
  end

  def publish
    authorize @quiz

    @quiz.set_slug
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.successful_publish") }
    else
      render status: :unprocessable_entity, json: { notice: t("quiz.failed_publish") }
    end
  end

  def unpublish
    authorize @quiz

    @quiz.remove_slug
    if @quiz.save
      render status: :ok, json: { notice: t("quiz.successful_unpublish") }
    else
      render status: :unprocessable_entity, json: { notice: t("quiz.failed_unpublish") }
    end
  end

  def update
    authorize @quiz
    # TODO: Two DB writes, Use a better method
    if @quiz.update(quiz_params)
      if !(@quiz.slug.nil? || @quiz.slug.empty?)
        @quiz.set_slug
        if @quiz.save
          render status: :ok, json: { notice: t("quiz.successful_update") }
        else
          render status: :unprocessable_entity, json: { notice: t("quiz.failed_publish") }
        end
      else
        render status: :ok, json: { notice: t("quiz.successful_update") }
      end
    else
      render status: :unprocessable_entity, json: { notice: t("quiz.failed_update") }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("quiz.successful_delete") }
    else
      render status: :unprocessable_entity, json: { notice: t("quiz.failed_delete") }
    end
  end

  def show
    authorize @quiz
    @questions = Question.where(quiz_id: @quiz.id).includes(:options)
  end

  private

    def quiz_params
      params.require(:quiz).permit(:id, :name)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
      unless @quiz
        render status: :not_found, json: { notice: t("quiz.not_found") }
      end
    end
end
