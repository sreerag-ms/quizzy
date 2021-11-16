# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempt_answers, dependent: :destroy

  validates_uniqueness_of :user_id, scope: [:quiz_id]
  validates :user_id, presence: true
  validates :quiz_id, presence: true

  accepts_nested_attributes_for :attempt_answers, allow_destroy: true
end
