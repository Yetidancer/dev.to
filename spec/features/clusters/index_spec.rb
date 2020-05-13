require "rails_helper"

RSpec.describe "cluster index", type: :feature do
  describe 'index page' do
    it 'should show index page' do
      user = create(:user)
      cluster1 = user.curated_clusters.create!(name: "Dopeness #1")
      cluster2 = user.curated_clusters.create!(name: "Dopeness #2")
      cluster3 = user.curated_clusters.create!(name: "Dopeness #3")

      user2 = create(:user)
      cluster4 = user2.curated_clusters.create!(name: "Dopeness #4")
      cluster5 = user2.curated_clusters.create!(name: "Dopeness #5")
      cluster6 = user2.curated_clusters.create!(name: "Dopeness #6")

      visit "/users/#{user.username}/curated_clusters"

      expect(page).to have_content("Matt's Cluster")
    end

    it 'should show show page' do
      user = create(:user)
      cluster1 = user.curated_clusters.create!(name: "Dopeness #1")
      cluster2 = user.curated_clusters.create!(name: "Dopeness #2")
      cluster3 = user.curated_clusters.create!(name: "Dopeness #3")

      user2 = create(:user)
      cluster4 = user2.curated_clusters.create!(name: "Dopeness #4")
      cluster5 = user2.curated_clusters.create!(name: "Dopeness #5")
      cluster6 = user2.curated_clusters.create!(name: "Dopeness #6")

      visit "/users/#{user.username}/curated_clusters"

      expect(page).to have_content("Matt's Cluster")
    end
  end
end
