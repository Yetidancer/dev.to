class CuratedCluster < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :curated_cluster_articles
  has_many :articles, through: :curated_cluster_articles
end
