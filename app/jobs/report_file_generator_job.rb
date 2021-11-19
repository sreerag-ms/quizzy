# frozen_string_literal: true

class ReportFileGeneratorJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "Generate file"
  end
end
