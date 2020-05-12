class CreateCuratedCluster < ActiveRecord::Migration[5.2]
  def change
    create_table :curated_clusters do |t|
      t.string :name

      t.timestamps
    end
  end
end
