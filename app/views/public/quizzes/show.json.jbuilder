# frozen_string_literal: true

json.extract! @quiz,
  :id,
  :slug,
  :name
json.questions @questions do |question|
  json.extract! question,
    :id,
    :description
  json.options question.options do |option|
    json.extract! option,
      :id,
      :name
  end
end
json.attempt_id @attempt.id if @attempt
