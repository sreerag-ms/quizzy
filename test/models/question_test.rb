# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @question = build(
      :question,
      options: [build(:option, is_correct: true), build(:option), build(:option), build(:option)])
  end

  def test_question_valid
    assert @question.valid?
  end

  def test_question_invalid
    @question.description = nil
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Description can't be blank"
  end

  def test_question_invalid_options
    @question.options = []
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options is too short (minimum is 2 characters)"
  end

  def test_question_invalid_maximum_options_length
    @question.options << build(:option)
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options is too long (maximum is 4 characters)"
  end

  def test_question_invalid_minimum_options_length
    @question.options = [build(:option, is_correct: true)]
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options is too short (minimum is 2 characters)"
  end

  def test_question_invalid_options_answer
    @question.options = ([ build(:option), build(:option)])
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options At least one option must be correct"
  end

  def test_multiple_correct_options
    @question.options.delete_all
    @question.options = [ build(:option, is_correct: true), build(:option, is_correct: true), build(:option)]

    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Options At most one option can be correct"
  end

  def test_inalid_maximum_description_length
    @question.description = "a" * 501
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Description is too long (maximum is 500 characters)"
  end
end
