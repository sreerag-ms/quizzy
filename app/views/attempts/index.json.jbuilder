# frozen_string_literal: true

json.array!(@attempts) do |attempt|
  json.extract! attempt,
    :id,
    :correct_answers_count,
    :incorrect_answers_count
  json.user do
    json.extract! attempt.user,
      :first_name,
      :last_name,
      :email
  end
  json.quiz do
    json.extract! attempt.quiz,
      :name
  end
end
