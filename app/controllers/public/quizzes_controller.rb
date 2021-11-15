# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:show]

  def show
    @questions = @quiz.questions
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { notice: t("quiz.not_found") }
      end
    end
end
