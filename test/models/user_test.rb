# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  def test_user_valid
    assert @user.valid?
  end

  def test_user_invalid_without_email
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Email can't be blank", "Email is invalid"
  end

  def test_user_invalid_without_first_name
    @user.first_name = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name can't be blank", "First name is invalid"
  end

  def test_user_invalid_without_last_name
    @user.last_name = nil
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name can't be blank", "Last name is invalid"
  end

  def test_user_invalid_email_format
    invalid_emails = %w[@.com,user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]
    invalid_emails.each do |email|
      @user.email = email
      assert_not @user.valid?
      assert_includes @user.errors.full_messages, "Email is invalid"
    end
  end

  def test_user_invalid_max_length_first_name
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "First name is too long (maximum is 50 characters)"
  end

  def test_user_invalid_max_length_last_name
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Last name is too long (maximum is 50 characters)"
  end

  def test_user_invalid_on_duplicate_email
    @user.save!
    @user2 = @user.dup
    assert @user2.invalid?
    assert_includes @user2.errors.full_messages, "Email has already been taken"
  end

  def test_user_invalid_email_case_insensitive
    @user.update!(email: "Falcon@spacex.com")
    @user2 = build(:user)
    @user2.email = "falcon@spacex.com"
    assert_not @user2.valid?
    assert_includes @user2.errors.full_messages, "Email has already been taken"
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
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end

  def test_user_password_min_length
    @user.password = "pass"
    assert_not @user.valid?
    assert_includes @user.errors.full_messages, "Password is too short (minimum is 6 characters)"
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
