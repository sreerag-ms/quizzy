# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    question
    name { Faker::Name.name }
    is_correct { false }
  end
end
