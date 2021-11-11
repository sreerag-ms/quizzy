# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = build(:quiz)
  end

  def test_valid
    assert @quiz.valid?
  end

  def test_invalid_without_name
    @quiz.name = nil
    assert_not @quiz.valid?
    assert_includes @quiz.errors.full_messages, "Name can't be blank"
  end

  def test_quiz_invalid_without_valid_user
    @quiz.user_id = -1
    assert_not @quiz.save
    assert_includes @quiz.errors.full_messages, "User must exist"
  end
end
