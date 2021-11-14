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
  User.create!(
    email: "sam@example.com",
    first_name: "Sam",
    last_name: "Smith",
    password: "welcome",
    password_confirmation: "welcome",
    role: "administrator"
  )
end
