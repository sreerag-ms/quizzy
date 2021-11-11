# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  validates :name, presence: true
end
