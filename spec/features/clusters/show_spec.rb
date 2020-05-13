require "rails_helper"

RSpec.describe "cluster show", type: :feature do
  describe 'show page' do
    it 'should show show page' do
      user = create(:user)
      cluster1 = user.curated_clusters.create!(name: "Dopeness #1")
      article1 = cluster1.articles.create!
      article2 = cluster1.articles.create!
      article3 = cluster1.articles.create!
      cluster2 = user.curated_clusters.create!(name: "Dopeness #2")
      article4 = cluster2.articles.create!
      article5 = cluster2.articles.create!
      article6 = cluster2.articles.create!
      cluster3 = user.curated_clusters.create!(name: "Dopeness #3")

      visit "/users/#{user.username}/curated_clusters/#{cluster1.id}"

      expect(page).to have_content("Matt's Cluster's Articles")
    end
  end
end
