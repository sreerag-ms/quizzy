# frozen_string_literal: true

json.array!(@attempts) do |attempt|
  json.id attempt.id
  json.first_name attempt.user.first_name
  json.last_name attempt.user.last_name
  json.email attempt.user.email
  json.quiz_name attempt.quiz.name
  json.correct_answers attempt.correct_answers_count
  json.incorrect_answers attempt.incorrect_answers_count
end
