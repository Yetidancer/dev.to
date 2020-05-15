require "rails_helper"

RSpec.describe "cluster create", type: :feature do
  describe "create page" do
    it "curated cluster creation" do
      user = create(:user)

      visit "/users/#{user.username}/curated_clusters"
      click_link "New Curated Cluster"
      expect(page).to have_current_path("/users/#{user.username}/curated_clusters/new", ignore_query: true)

      fill_in :name, with: "Matt's Cluster"
      click_on "Create Curated Cluster"

      expect(page).to have_current_path("/users/#{user.username}/curated_clusters")
      expect(page).to have_content("Matt's Cluster")
    end
  end
end
