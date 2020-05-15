class CuratedClustersController < ApplicationController
  def index
    @user = User.find_by(username: params["username"])
    @clusters = @user.curated_clusters
  end

  def show
    @cluster = CuratedCluster.find(params[:id])
    @articles = @cluster.articles
  end

  def new
    @user = User.find_by(username: params["username"])
  end

  def create
    @user = User.find_by(username: params["username"])
    @user.curated_clusters.create(cluster_params)
    redirect_to "/users/#{@user.username}/curated_clusters"
  end

  private

  def cluster_params
    params.permit(:name)
  end
end
