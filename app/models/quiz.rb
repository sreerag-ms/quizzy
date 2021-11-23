# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50, minimum: 1 }
  validates :slug, uniqueness: true, allow_nil: true
  accepts_nested_attributes_for :questions, allow_destroy: true
  before_update :set_slug, if: :check_require_slug_change

  def set_slug
    name_slug = name.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{name_slug}$|#{name_slug}-[0-9]+$"
    ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
    self.slug = slug_candidate
  end

  def remove_slug
    self.slug = nil
    self.save
  end

  def check_require_slug_change
    !self.slug.nil? && self.name_changed?
  end
end
