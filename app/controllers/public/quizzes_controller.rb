# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: :show
  before_action :load_quiz, only: [:show, :verify_slug]
  before_action :load_attempt, only: :show

  def show
    @questions = Question.where(quiz_id: @quiz.id).includes(:options)
  end

  def verify_slug
    if @quiz.present?
      render status: :ok, json: {}
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { notice: t("quiz.not_found") }
      end
    end

    def load_attempt
      @attempt = Attempt.find_by(user_id: @current_user.id, quiz_id: @quiz.id)
      unless @attempt
        render status: :forbidden, json: { errors: t("public.attempt.failed_not_found") }
      end
      unless !@attempt.submitted?
        render status: :forbidden, json: { notice: t("public.quiz.failed_already_complete") }
      end
    end
end
