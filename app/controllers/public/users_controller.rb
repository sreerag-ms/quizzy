# frozen_string_literal: true

require "digest"

class Public::UsersController < ApplicationController
  def create
    @user = User.find_by_email(user_params[:email])
    unless @user
      @user = User.new(user_params)
      @user.password = @user.password_confirmation = Digest::SHA256.hexdigest(user_params[:email])
      unless @user.save
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
