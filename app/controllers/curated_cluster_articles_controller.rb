class CuratedClusterArticlesController < ApplicationController
  def create
    cluster = CuratedCluster.find(params["cluster_id"])
    article = Article.find(params["article_id"])
    cluster.articles << article
  end

  private

  def cluster_params
    params.permit(:name)
  end
end
