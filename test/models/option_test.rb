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
  end
end
