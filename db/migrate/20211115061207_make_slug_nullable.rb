# frozen_string_literal: true

class MakeSlugNullable < ActiveRecord::Migration[6.1]
  def up
    change_column_null :quizzes, :slug, true
  end

  def down
    change_column_null :quizzes, :slug, false
  end
end
