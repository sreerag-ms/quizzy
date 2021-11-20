# frozen_string_literal: true

class ReportFileRemoverJob < ApplicationJob
  queue_as :default

  def perform(path)
    File.delete(path) if File.exist?(path)
  end
end
