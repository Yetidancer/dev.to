class CuratedClustersController < ApplicationController
  def index
    user = User.find_by(username: params["username"])

    @clusters = user.curated_clusters

    @serialized_clusters = @clusters.map { |cluster| { id: cluster.id, name: cluster.name } }



    # require "pry"; binding.pry
  end

  def show
    user = User.find_by(username: params["username"])
    @cluster = CuratedCluster.find(params[:id])
    @articles = @cluster.articles
    # require "pry"; binding.pry
  end
end
