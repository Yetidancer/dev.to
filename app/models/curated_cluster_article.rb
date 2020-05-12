class CuratedClusterArticle < ApplicationRecord
  belongs_to :articles
  belongs_to :curated_cluster
end

