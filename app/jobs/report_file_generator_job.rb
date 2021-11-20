# frozen_string_literal: true

class ReportFileGeneratorJob
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  queue_as :default

  def perform(user_id)
    axlsx = Axlsx::Package.new
    @attempts = Attempt.where(submitted: true).eager_load([:user, :quiz]).where(
      quiz: { user_id: user_id })
    axlsx.workbook.add_worksheet(name: "Reports") do |sheet|
  sheet.add_row ["Quiz Name", "User name", "Email", "Answers count", "Incorrect Answer"]
  @attempts.each do |attempt|
    sheet.add_row [attempt.quiz.name, attempt.user.first_name + attempt.user.first_name, attempt.user.email,
    attempt.correct_answers_count, attempt.incorrect_answers_count]
  end
end
    axlsx.serialize "#{Rails.root}/public/reports/#{self.jid}.xlsx"
  end
end
