# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  # TODO setup factory, clean setup method
  def setup
    @option = build(:option)
    @question = create(:question, options: [build(:option, answer: true), build(:option), build(:option), @option])
    @attempt = create(:attempt)
    @attempt_answer = build(
      :attempt_answer, attempt_id: @attempt.id, question_id: @question.id,
                       option_id: @option.id)
  end

  def test_attempt_answer_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_invalid_on_invalid_attempt_id
    @attempt_answer.attempt_id = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Attempt can't be blank"
  end

  def test_attempt_answer_invalid_on_invalid_question_id
    @attempt_answer.question_id = nil
    assert_not @attempt_answer.valid?
    assert_includes @attempt_answer.errors.full_messages, "Question can't be blank"
  end

  def test_attempt_answer_valid_on_empty_option_id
    @attempt_answer.option_id = nil
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_invalid_with_duplicate_question_id_and_attempt_id
    @attempt_answer2 = @attempt_answer.dup
    @attempt_answer.save!
    assert_not @attempt_answer2.valid?
    assert_includes @attempt_answer2.errors.full_messages, "Attempt has already been taken"
  end

  def test_attempt_answer_valid_with_same_question_id_different_attempt_id
    @attempt_answer2 = @attempt_answer.dup
    @attempt_answer.save!
    @attempt2 = create(:attempt)
    @attempt_answer2.attempt_id = @attempt2.id
    assert @attempt_answer2.valid?
  end

  def test_attempt_answer_invalid_with_same_attempt_id_different_question_id
    @attempt_answer2 = @attempt_answer.dup
    @attempt_answer.save!
    @question2 = create(:question, options: [build(:option, answer: true), build(:option)])
    @attempt_answer2.question_id = @question2.id
    assert @attempt_answer2.valid?
  end
end
