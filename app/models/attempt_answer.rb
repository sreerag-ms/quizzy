# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question
  belongs_to :option

  validates_uniqueness_of :attempt_id, scope: [:question_id]

  validates :attempt_id, presence: true
  validates :question_id, presence: true
end
