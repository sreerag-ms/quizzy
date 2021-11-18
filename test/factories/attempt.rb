# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    association :user
    association :quiz
    submitted { false }
  end
end
