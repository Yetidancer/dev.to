require "rails_helper"

RSpec.describe CuratedClusterArticle, type: :model do
  describe "relationships" do
    it { is_expected.to belong_to :articles }
    it { is_expected.to belong_to :curated_cluster }
  end
end
