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

  def test_quiz_invalid_on_duplicate_slug
    @quiz.update!(slug: "test")
    @quiz2 = build(:quiz, slug: "test")
    assert_not @quiz2.valid?
    assert_includes @quiz2.errors.full_messages, "Slug has already been taken"
  end

  def test_quiz_name_parameterized_slug
    @quiz.name = "Test Quiz"
    @quiz.set_slug
    assert_equal @quiz.name.parameterize, @quiz.slug
  end

  def test_quiz_name_parameterized_slug_count_on_same_name
    @quiz.name = "sample quiz"
    @quiz.set_slug
    @quiz.save!
    @quiz2 = build(:quiz, name: "sample quiz")
    @quiz2.set_slug

    assert_equal "sample-quiz", @quiz.slug
    assert_equal "sample-quiz-2", @quiz2.slug
  end

  def test_quiz_unique_slug_on_number_suffix
    @quiz.update!(slug: "sample-quiz-2")
    @quiz2 = build(:quiz, name: "sample quiz-2")
    @quiz2.set_slug
    assert_equal "sample-quiz-2-3", @quiz2.slug
  end

  def test_quiz_allow_multiple_nil_slug
    @quiz.save!
    @quiz2 = build(:quiz)
    assert @quiz2.valid?
  end

  def test_quiz_slug_change_on_name_change_on_update
    @quiz.update!(slug: "sample_slug")
    @quiz.update!(name: "Test Quiz")
    assert_equal "test-quiz", @quiz.slug
  end

  def test_quiz_no_slug_generation_for_quiz_without_slug_on_update
    @quiz.save!
    @quiz.update!(name: "Sample Quiz")
    assert_nil @quiz.slug
  end
end
