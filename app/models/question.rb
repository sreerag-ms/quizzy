# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  validates :description, presence: true
  validates :options, length: { minimum: 2, maximum: 4 }
  validate :one_correct_option
  accepts_nested_attributes_for :options, allow_destroy: true

  private

    def one_correct_option
      res = false
      self.options.each do |option|
        puts "sss"
        if option.answer
          if res
            errors.add(:options, "Only one correct option permitted")
          end
          res = true
        end
      end
   end
end
