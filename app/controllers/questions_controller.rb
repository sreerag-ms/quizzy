# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def create
    question = Question.new(question_params)
    if question.save!
      render status: :ok, json: { notice: t("question.question_saved") }
    else
      render status: :unprocessable_entity, json: { error: question.errors.full_messages.join(", ") }
    end
  end

  private

    def question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [:name, :answer])
    end
end
