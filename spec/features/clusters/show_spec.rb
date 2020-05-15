require "rails_helper"

RSpec.describe "cluster show", type: :feature do
  describe 'show page' do
    it 'should show show page' do
      user = create(:user)
      user2 = create(:user)
      cluster1 = user.curated_clusters.create!(name: "Dopeness #1")

      article1 = create(:article)
      article2 = create(:article)
      article3 = create(:article)
      cluster2 = user.curated_clusters.create(name: "Dopeness #2")
      article4 = create(:article)
      article5 = create(:article)
      article6 = create(:article)
      cluster3 = user2.curated_clusters.create(name: "Dopeness #3")

      cluster_article1 = CuratedClusterArticle.create!(article_id: article1.id, curated_cluster_id: cluster1.id)
      cluster_article2 = CuratedClusterArticle.create!(article_id: article2.id, curated_cluster_id: cluster1.id)
      cluster_article3 = CuratedClusterArticle.create!(article_id: article3.id, curated_cluster_id: cluster1.id)
      cluster_article4 = CuratedClusterArticle.create!(article_id: article4.id, curated_cluster_id: cluster2.id)
      cluster_article5 = CuratedClusterArticle.create!(article_id: article5.id, curated_cluster_id: cluster3.id)
      cluster_article6 = CuratedClusterArticle.create!(article_id: article6.id, curated_cluster_id: cluster3.id)
      require "pry"; binding.pry

      visit "/users/#{user.username}/curated_clusters/#{cluster1.id}"

      expect(page).to have_content("Matt's Cluster's Articles")
    end
  end
end
