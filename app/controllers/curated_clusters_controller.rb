class CuratedClustersController < ApplicationController
  def index
    user = User.find_by(username: params["username"])

    @clusters = user.curated_clusters

    require "pry"; binding.pry
  end

  def show
    user = User.find_by(username: params["username"])
    @cluster = CuratedCluster.find(params[:id])
    @articles = @cluster.articles
    require "pry"; binding.pry
  end
end
