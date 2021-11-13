# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: [:update, :destroy]
  def create
    question = Question.new(question_params)
    if question.save!
      render status: :ok, json: { notice: t("question.question_saved") }
    else
      render status: :unprocessable_entity, json: { notice: t("question.failed_save") }
    end
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: t("question.successful_update") }
    else
      render status: :unprocessable_entity, json: { notice: t("question.failed_update") }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("question.successful_delete") }
    else
      render status: :unprocessable_entity, json: { notice: t("question.failed_delete") }
    end
  end

  private

    def question_params
      params.require(:question).permit(
        :description, :id, :quiz_id,
        options_attributes: [:id, :name, :answer, :_destroy])
    end

    def load_question
      @question = Question.find(params[:id])
      unless @question
        render status: :not_found, json: { notice: t("question.not_found") }
      end
    end
end
