# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers

  validates :description, presence: true
  validates :options, length: { minimum: 2, maximum: 4 }
  validate :only_one_correct_option
  accepts_nested_attributes_for :options, allow_destroy: true

  private

    def only_one_correct_option
      res = false
      self.options.each do |option|
        if option.answer
          if res
            errors.add(:options, "At most one option can be correct")
            return
          end
          res = true
        end
      end
      if !res
        errors.add(:options, "At least one option must be correct")
      end
   end
end
