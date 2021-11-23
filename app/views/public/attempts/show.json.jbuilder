# frozen_string_literal: true

json.extract! @attempt,
  :id,
  :quiz_id
json.name @attempt.quiz.name
json.questions @attempt_answers.each do |attempt_answer|
  json.id attempt_answer.question_id
  json.marked attempt_answer.option_id
  json.description attempt_answer.question.description
  json.options attempt_answer.question.options do |option|
    json.extract! option,
      :id,
      :name,
      :is_correct
  end
end
json.correct_answers @attempt.correct_answers_count
json.incorrect_answers @attempt.incorrect_answers_count
