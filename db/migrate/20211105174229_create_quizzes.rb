# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true
      t.string :slug, null: false, index: { unique: true }
      t.timestamps
    end
  end
end
