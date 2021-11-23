# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    user
    name { Faker::Name.name }
  end
end
