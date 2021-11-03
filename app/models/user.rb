# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: 0, administrator: 1 }

  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: Constants::VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: Constants::MAX_FIRST_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_LAST_NAME_LENGTH }
  validates :password, presence: true, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
