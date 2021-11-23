# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  has_many :attempt_answers, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }
end
