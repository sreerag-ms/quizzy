# frozen_string_literal: true

require "digest"

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :create
  before_action :load_attempt_from_slug, only: :show
  before_action :load_attempt_from_id, only: :update
  before_action :load_user, :load_quiz, :load_attempt_from_user_and_quiz, only: :create
  after_action :save_score, :calculate_score, only: :update

  def create
    unless @attempt
      @attempt = @user.attempts.new(quiz_id: @quiz.id)
      unless @attempt.save
        render status: :unprocessable_entity, json: { errors: @attempt.errors.full_messages }
      end
    end
  end

  def update
    if @attempt.update(attempt_params.merge(submitted: true))
      render json: { notice: t("public.attempt.successful_submit") }, status: :ok
    else
      render json: { errors: @attempt.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @attempt_answers = AttemptAnswer.where(attempt_id: @attempt.id).includes(question: [:options])
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

    def save_score
      @attempt.update(correct_answers_count: @correct_answers, incorrect_answers_count: @incorrect_answers)
    end

    def attempt_params
      params.require(:attempt).permit(
        :id,
        :user_id, :quiz_id,
        attempt_answers_attributes: [:question_id, :option_id, :attempt_id]
      )
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end

    def load_attempt_from_slug
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render json: { notice: t("public.quiz.failed_not_found") }, status: :not_found
      end
      @attempt = Attempt.find_by(quiz_id: @quiz.id, user_id: @current_user.id)
      unless @attempt
        render json: { notice: t("public.attempt.failed_not_found") }, status: :not_found
      end
      unless @attempt.submitted?
        render json: { notice: t("public.quiz.failed_not_submitted") }, status: :forbidden
      end
    end

    def load_attempt_from_id
      @attempt = Attempt.find(params[:id])
      unless @attempt
        render status: :forbidden, json: { errors: t("public.attempt.failed_not_found") }
      end
      unless !@attempt.submitted?
        render json: { notice: t("public.attempt.failed_already_submitted") }, status: :unprocessable_entity
      end
    end

    def load_attempt_from_user_and_quiz
      @attempt = Attempt.find_by(user_id: @user.id, quiz_id: @quiz.id)
    end

    def load_user
      @user = User.find_by_email(user_params[:email])
      unless @user
        @user = User.new(user_params)
        @user.password = @user.password_confirmation = Digest::SHA256.hexdigest(@user.email)
        unless @user.save
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render json: { notice: t("public.quiz.failed_not_found") }, status: :not_found
      end
    end
end
