# frozen_string_literal: true

class RenameAnswerCheckingColumnInOptions < ActiveRecord::Migration[6.1]
  def change
    rename_column :options, :answer, :is_correct
  end
end
