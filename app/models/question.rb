# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers

  validates :description, presence: true, length: { maximum: 500, minimum: 1 }
  validates :options, length: { minimum: 2, maximum: 4 }
  validate :exact_one_correct_option
  accepts_nested_attributes_for :options, allow_destroy: true

  private

    def exact_one_correct_option
      correct_option_found = false
      self.options.each do |option|
        if option.is_correct
          if correct_option_found
            errors.add(:options, "At most one option can be correct")
            return
          end
          correct_option_found = true
        end
      end
      unless correct_option_found
        errors.add(:options, "At least one option must be correct")
      end
   end
end
