class CreateCuratedClusterArticle < ActiveRecord::Migration[5.2]
  def change
    create_table :curated_cluster_articles do |t|
      t.references :article, foreign_key: true
      t.references :curated_cluster, foreign_key: true

      t.timestamps
    end
  end
end

