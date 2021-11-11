# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    association :user
    name { Faker::Name.name }
  end
end
