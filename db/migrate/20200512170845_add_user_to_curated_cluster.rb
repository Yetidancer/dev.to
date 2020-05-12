class AddUserToCuratedCluster < ActiveRecord::Migration[5.2]
  def change
    add_reference :curated_clusters, :user, foreign_key: true
  end
end
