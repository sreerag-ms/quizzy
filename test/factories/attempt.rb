# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    user
    quiz
    submitted { false }
  end
end
