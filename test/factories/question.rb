# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    quiz
    description { Faker::Name.name }
  end
end
