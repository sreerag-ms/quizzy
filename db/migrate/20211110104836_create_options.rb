# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :name, null: false
      t.references :question, null: false, foreign_key: true
      t.boolean :answer, null: false, default: false
      t.timestamps
    end
  end
end
