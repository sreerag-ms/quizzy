# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @attempt = create(:attempt)
  end

  def test_attempt_valid
    assert @attempt.valid?
  end

  def test_attempt_invalid_without_user
    @attempt.user_id = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "User can't be blank"
  end

  def test_attempt_invalid_without_quiz
    @attempt.quiz_id = nil
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Quiz can't be blank"
  end

  def test_attempt_invald_for_same_quiz_and_user
    @attempt2 = @attempt.dup
    @attempt.save!
    @attempt2.submitted = true
    assert_not @attempt2.valid?
    assert_includes @attempt2.errors.full_messages, "User has already been taken"
  end

  def test_attempt_valid_for_same_user_different_quiz
    @attempt2 = @attempt.dup
    @attempt.save!
    @quiz2 = build(:quiz)
    @quiz2.save!
    @attempt2.quiz_id = @quiz2.id
    assert @attempt2.valid?
  end

  def test_attempt_valid_for_same_quiz_different_user
    @attempt2 = @attempt.dup
    @attempt.save!
    @user2 = build(:user)
    @user2.save!
    @attempt2.user_id = @user2.id
    assert @attempt2.valid?
  end

  def test_attempt_invalid_with_invalid_user
    @attempt.user_id = -1
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "User must exist"
  end

  def test_attempt_invalid_with_invalid_quiz
    @attempt.quiz_id = -1
    assert_not @attempt.valid?
    assert_includes @attempt.errors.full_messages, "Quiz must exist"
  end
end
