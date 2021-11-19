# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:show]
  before_action :load_quiz, only: [:show, :verify_slug]
  before_action :load_attempt, only: [:show]

  def show
    @questions = Question.where(quiz_id: @quiz.id).includes(:options)
    unless @attempt.save!
      render json: { errors: @attempt.errors.full_messages }, status: :unprocessable_entity
    end
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
        @attempt = @current_user.attempts.new(quiz_id: @quiz.id)
        unless @attempt.save
          render status: :forbidden, json: { errors: @attempt.errors.full_messages }
        end
      end
      unless !@attempt.submitted?
        render status: :forbidden, json: { notice: t("public.quiz.quiz_complete") }
      end
    end
end
