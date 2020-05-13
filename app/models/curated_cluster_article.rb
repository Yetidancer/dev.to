class CuratedClusterArticle < ApplicationRecord
  belongs_to :article
  belongs_to :curated_cluster
end
