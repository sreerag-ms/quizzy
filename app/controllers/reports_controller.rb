# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def generate
    fileName = "#{Time.now.to_i.to_s}_#{@current_user.id}_report"
    ReportFileGeneratorJob.set(wait: 5.seconds).perform_later(@current_user.id, fileName)
    render json: { file_name: fileName }
  end

  def download
    fileName = params[:file_name]
    path = "#{Rails.root}/public/reports/#{fileName}.xlsx"
    if File.exist?(path)
      send_file(
        path,
        filename: "Report.xlsx")
    end
  end
end
