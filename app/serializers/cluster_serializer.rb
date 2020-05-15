class ClusterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
end
