import { h, Component } from 'preact';
import PropTypes from 'prop-types';
export class CuratedClustersShow extends Component {
  showArticles = articles => {
    return JSON.parse(articles).map(article => {
      return (
        <div className = "single-article single-article-small-pic">
          <div className = "article-cluster-card">
            <div className="item-wrapper">
              <a className="item" href={article.path}>
                <div className="item-title">{article.title}</div>

                <div className="item-details">
                  <a
                    className="item-user"
                    href={`/${article.cached_user_username}`}
                  >
                    <img src={article.main_image} alt="Profile Pic" />

                    {`${article.reading_time} min read・`}
                  </a>

                  {article.tag_list.length > 0 ? (
                    <span className="item-tags">
                      {article.tag_list.map(tag => (
                        <a className="item-tag" href={`/t/${tag}`}>
                          {`#${tag}`}
                        </a>
                      ))}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </a>
            </div>

          </div>
        </div>
      );
    });
  };

  render() {
    const { articles, cluster } = this.props;
    console.log(JSON.parse(articles)[0]);
    const clusterName = JSON.parse(cluster).name;
    return (
      <div className="articles-list">
        <div className="clusters-header">{clusterName}</div>
        {this.showArticles(articles)}
      </div>
    );
  }
}

CuratedClustersShow.displayName = 'CuratedClustersShow';


CuratedClustersShow.propTypes = {
  articles: PropTypes.any.isRequired,
  cluster: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    name: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  }).isRequired,
};