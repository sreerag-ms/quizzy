# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "rails", "~> 6.1.4", ">= 6.1.4.1"

# friends of Rails
gem "sass-rails", ">= 6"
gem "webpacker", "~> 5.0"

# database
gem "pg", group: [:production]
gem "sqlite3", "~> 1.4", group: [:development, :test]

# Application server
gem "puma", "~> 5.0"

# JSON builder
gem "jbuilder", "~> 2.7"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.4.4", require: false

# Authorization
gem "pundit"

# React
gem "react-rails"

# Generates model objects
gem "factory_bot_rails"

# Creates demo data
gem "faker"

# Authentication
gem "bcrypt", "~> 3.1.13"

# For background jobs
gem "sidekiq"

# Excel file generator
gem "caxlsx"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code
  gem "web-console", ">= 4.1.0"

  # Listens to file modifications and notifies you about the changes
  gem "listen", "~> 3.3"

  # Spring speeds up development by keeping your application running in the background.
  gem "spring"

  # For code formatting and linting
  gem "rubocop"
  gem "rubocop-rails"
end

group :test do
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
