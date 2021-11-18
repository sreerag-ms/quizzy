# frozen_string_literal: true

json.extract! @user,
  :first_name,
  :last_name,
  :authentication_token,
  :role
