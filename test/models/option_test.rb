# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @quiz = build(:quiz)
    @quiz.save!
    @question = @quiz.questions.new(description: "Test Question")
    @option = @question.options.new(name: "Test Option", answer: true)
    @option2 = @question.options.new(name: "Test Option 2", answer: false)
    @question.save!
  end

  def test_valid
    assert @option.valid?
  end

  def test_invalid_without_name
    @option.name = nil
    assert_not @option.valid?
  end
end
