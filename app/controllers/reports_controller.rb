# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def generate
    fileName = "#{Time.now.to_i.to_s}_#{@current_user.id}_report"
    ReportFileGeneratorJob.perform_later(@current_user.id, fileName)
    render json: { message: "#{Rails.root}/public/reports/#{fileName}.xlsx" }
  end
end
