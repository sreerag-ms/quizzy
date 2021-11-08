# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "falcon@spacex.com",
      first_name: "falcon",
      last_name: "nine",
      password: "password",
      password_confirmation: "password"
    )
    @user.save!
    @quiz = @user.quizzes.new(name: "sample quiz")
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
