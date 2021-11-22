# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @option = build(:option)
  end

  def test_valid
    assert @option.valid?
  end

  def test_invalid_without_name
    @option.name = nil
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Name can't be blank"
  end

  def test_invalid_on_maximum_length_name
    @option.name = "a" * 51
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Name is too long (maximum is 50 characters)"
  end
end
