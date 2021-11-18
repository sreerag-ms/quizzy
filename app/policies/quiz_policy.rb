# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz
  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def update?
    @quiz.user_id == @user.id
    @user.role == "administrator"
  end

  def destroy?
    update?
  end

  def show?
    update?
  end

  def publish?
    update?
  end

  def unpublish?
    update?
  end

  def create?
    user.role == "administrator"
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end
end
