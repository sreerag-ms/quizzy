# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def generate
    job_id = ReportFileGeneratorJob.perform_async(@current_user.id)
    render json: { file_name: job_id }
  end

  def download
    job_id = params[:file_name]
    path = "#{Rails.root}/public/reports/#{job_id}.xlsx"
    unless Sidekiq::Status::failed?(job_id)
      if File.exist?(path)
        send_file(
          path,
          filename: "Report.xlsx")
        ReportFileRemoverJob.set(wait: 10.seconds).perform_later(path)
      end
    else
      render json: { notice: t("report.failed_generation") }, status: :internal_server_error
    end
  end
end
