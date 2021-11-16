# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    association :question
    name { Faker::Name.name }
    answer { false }
  end
end
