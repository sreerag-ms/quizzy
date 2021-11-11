# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :description, null: false
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
  end
end
