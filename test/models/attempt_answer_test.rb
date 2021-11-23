# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @attempt_answer = build(:attempt_answer)
  end

  def test_attempt_answer_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_invalid_on_invalid_attempt_id
    @attempt_answer.attempt = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Attempt must exist"
  end

  def test_attempt_answer_invalid_on_invalid_question_id
    @attempt_answer.question = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Question must exist"
  end

  def test_attempt_answer_valid_on_empty_option_id
    @attempt_answer.option = nil
    assert @attempt_answer.valid?
  end
end
