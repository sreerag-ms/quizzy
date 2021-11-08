# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :handle_unauthorized_requests

  def authenticate_user_using_x_auth_token
    user_email = request.headers["X-Auth-Email"]
    auth_token = request.headers["X-Auth-Token"].presence
    user = user_email && User.find_by_email(user_email)

    if user && auth_token &&
      ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token, auth_token
      )
      @current_user = user
    else
      render status: :unauthorized, json: { error: t("session.auth_failure") }
    end

    def handle_unauthorized_requests
      render status: :forbidden, json: { error: t("quiz.unauthorized_requests") }
    end
  end

  def current_user
    @current_user
  end
end
