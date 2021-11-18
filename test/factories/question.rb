# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    association :quiz
    description { Faker::Name.name }
  end
end
