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
  create_user! email: "sam@example.com", first_name: "Sam", last_name: "Smith"
  create_user! email: "falcon@heavy.com", first_name: "Falcon", last_name: "Heavy"
end

def create_user!(options = {})
  user_attributes = {
    password: "welcome",
    password_confirmation: "welcome",
    role: "administrator"
  }
  attributes = user_attributes.merge options
  User.create! attributes
end
