require 'rails_helper'

RSpec.describe Country, type: :model do
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :currencies }
  it { is_expected.to validate_presence_of :acronym }
  it { is_expected.to validate_presence_of :flag }
  it { is_expected.to validate_presence_of :regional_blocs }
  it { is_expected.to validate_presence_of :timezones }
  it { is_expected.to validate_presence_of :languages }
  it { is_expected.to validate_presence_of :capital }
  it { is_expected.to validate_presence_of :borders }
  it { is_expected.to validate_presence_of :population }
  it { is_expected.to validate_numericality_of(:population).is_greater_than(0) }
end
