require "rails_helper"

RSpec.describe CuratedCluster, type: :model do
  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe "relationships" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many :curated_cluster_articles }
    it { is_expected.to have_many(:articles).through(:curated_cluster_articles) }
  end
end
