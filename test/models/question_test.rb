# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @quiz = build(:quiz)
    @quiz.save!
    @question = @quiz.questions.new(description: "sample question")
    @question.options.new(
      [{ name: "sss", answer: false }, { name: "ssb", answer: false },
      { name: "ssc", answer: true }])
  end

  def test_question_valid
    assert @question.valid?
  end

  def test_question_invalid
    @question.description = nil
    assert_not @question.valid?
  end

  def test_question_invalid_options
    @question.options = []
    assert_not @question.valid?
  end

  def test_question_invalid_options_length
    @question.options.new([{ name: "sss", answer: false }, { name: "ssb", answer: false }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options is too long (maximum is 4 characters)"
  end

  def test_question_invalid_options_answer
    @question.options.delete_all
    @question.options.new([{ name: "sss", answer: false }, { name: "ssb", answer: false }])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options At least one option must be correct"
  end

  def test_multiple_correct_options
    @question.options.delete_all
    @question.options.new(
      [{ name: "sss", answer: false }, { name: "ssb", answer: false },
                                 { name: "ssc", answer: true }, { name: "ssd", answer: true }])

    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options At most one option can be correct"
  end
end
