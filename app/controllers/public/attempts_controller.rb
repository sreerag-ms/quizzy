# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_attempt_from_slug, only: [:show]
  after_action :save_score, :calculate_score, only: [:update]

  def update
    @attempt = Attempt.find(params[:id])
    if !@attempt.submitted?
      if @attempt.update(attempt_params.merge(submitted: true))
        render json: { notice: t("public.attempt.successful_submit") }, status: :ok
      else
        render json: { errors: @attempt.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { notice: t("public.attempt.failed_already_submitted") }, status: :unprocessable_entity
    end
  end

  def show
  end

  private

    def calculate_score
      @correct_answers = 0
      @attempt.attempt_answers.each do |attempt_answer|
        if attempt_answer.option&.is_correct?
          @correct_answers += 1
        end
      end
      @incorrect_answers = @attempt.attempt_answers.count - @correct_answers
    end

    def attempt_params
      params.require(:attempt).permit(
        :id,
        :user_id, :quiz_id,
        attempt_answers_attributes: [:question_id, :option_id, :attempt_id])
    end

    def load_attempt_from_slug
      @quiz = Quiz.find_by(slug: params[:slug])
      @attempt = Attempt.find_by(quiz_id: @quiz.id, user_id: @current_user.id)
    end

    def save_score
      @attempt.update!(correct_answers_count: @correct_answers, incorrect_answers_count: @incorrect_answers)
    end
end
