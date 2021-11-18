# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  has_many :quizzes
  has_many :attempts

  enum role: { standard: 0, administrator: 1 }

  has_secure_token :authentication_token
  has_secure_password
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
