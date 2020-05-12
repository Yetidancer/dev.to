class AddUserToCuratedCluster < ActiveRecord::Migration[5.2]
  disable_ddl_transaction!
  def change
    add_reference :curated_clusters, :user, foreign_key: true, index: {algorithm: :concurrently}
  end
end
