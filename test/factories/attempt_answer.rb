# frozen_string_literal: true

# TODO: Factory not working
FactoryBot.define do
  factory :attempt_answer do
    question
    option
    attempt
  end
end
