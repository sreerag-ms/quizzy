# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "falcon@spacex.com",
      first_name: "falcon",
      last_name: "nine",
      password: "password",
      password_confirmation: "password"
    )
  end

  def test_user_valid
    assert @user.valid?
  end

  def test_user_invalid_email
    @user.email = nil
    assert_not @user.valid?
  end

  def test_user_invalid_first_name
    @user.first_name = nil
    assert_not @user.valid?
  end

  def test_user_invalid_last_name
    @user.last_name = nil
    assert_not @user.valid?
  end

  def test_user_invalid_email_format
    invalid_emails = %w[@.com,user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_user_invalid_email_and_first_name_and_last_name
    @user.email = nil
    @user.first_name = nil
    @user.last_name = nil
    assert_not @user.valid?
  end

  def test_user_invalid_max_length_first_name
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_user_invalid_max_length_last_name
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_user_uniqueness_email
    @user.save
    @user2 = User.new(email: "falcon@spacex.com", first_name: "raptor", last_name: "sn1")
    assert @user2.invalid?
  end

  def test_user_uniqueness_email_case_insensitive
    @user.email = "Falcon@spacex.com"
    @user.save
    @user2 = User.new(email: "falcon@spacex.com", first_name: "raptor", last_name: "sn1")
    assert_not @user2.valid?
  end

  def test_user_role_default
    assert_equal "standard", @user.role
  end

  def test_user_role_admin
    @user.role = "administrator"
    assert_equal "administrator", @user.role
  end

  def test_user_role_standard
    @user.role = "standard"
    assert_equal "standard", @user.role
  end

  def test_user_role_invalid
    assert_raise(ArgumentError) { @user.role = "invalid" }
  end

  def test_user_password_does_not_match_password_confirmation
    @user.password = "password"
    @user.password_confirmation = "password2"
    assert_not @user.valid?
  end

  def test_user_password_min_length
    @user.password = "pass"
    assert_not @user.valid?
  end

  def test_user_error_on_save_without_password
    @user.password = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_user_error_on_save_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end
end
