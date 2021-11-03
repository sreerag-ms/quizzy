# frozen_string_literal: true

# For setting up fresh database
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_sample_data"].invoke if Rails.env.development?
end

task populate_sample_data: [:environment] do
  puts "Adding sample data..."
  create_sample_data!
  puts "Sample data has been added."
end

def create_sample_data!
  create_user! email: "sam@example.com"
end

def create_user!(options = {})
  user_attributes = {
    first_name: "Sam",
    last_name: "Smith",
    password: "welcome",
    password_confirmation: "welcome",
    role: "administrator"
  }
  attributes = user_attributes.merge options
  User.create! attributes
end
