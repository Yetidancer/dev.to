import { h, Component } from 'preact';
import PropTypes from 'prop-types';

export class CuratedClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      curatedClusters: [],
      clusterId: null,
    };
  }

  componentDidMount = () => {
    const { curatedClusters } = this.props;
    const clusterList = JSON.parse(curatedClusters);
    const clusterId = clusterList[0];
    this.setState({
      curatedClusters: clusterList,
      clusterId,
    });
  };

  showModal = e => {
    e.preventDefault();
    const { showModal } = this.state;
    const updatedState = !showModal;
    this.setState({ showModal: updatedState });
  };

  selectHelper = e => {
    this.setState({ clusterId: e.target.value });
    // console.log('clusterid:', this.state.clusterId);
    // console.log('userName:', this.state.currentArticle);
    // console.log('articleId:', this.state.clusterId);
  };

  fetchHelper = () => {
    const { articleId, userName, clusterId } = this.props;
    const payload = JSON.stringify({
      data: {
        user_name: userName,
        article_id: articleId,
        cluster_Id: clusterId,
      },
    });
    fetch(`/users/${userName}/curated_clusters`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        curated_collection: payload,
      }),
      credentials: 'same-origin',
    }).then(data => console.log(data));
  };

  renderClusters = () => {
    const { curatedClusters } = this.state;
    const collecitonHTML = curatedClusters.map(cluster => {
      return <option value={`${cluster.id}`}>{cluster.name}</option>;
    });

    return (
      <select className="dropdown" onBlur={e => this.selectHelper(e)}>
        {collecitonHTML}
      </select>
    );
  };

  renderForm = () => {
    return (
      <div>
        <div className="modal" id="modal1">
          <div className="modal-dialog">
            <header className="modal-header">
              <div className="close-modal">
                <button
                  type="submit"
                  onClick={e => this.showModal(e)}
                  aria-label="close modal"
                >
                  [X]Close
                </button>
              </div>
            </header>
            <section className="modal-content">{this.renderClusters()}</section>
            <footer className="modal-footer">
              <button
                type="submit"
                className="cta cta-button"
                id="sumbitCollection"
                onClick={() => this.fetchHelper()}
              >
                Submit Cluster
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { showModal, clusterId } = this.state;
    return (
      <div>
        {clusterId ? (
          <div>
            <button id="modal" onClick={e => this.showModal(e)} type="submit">
              Add to Collections
            </button>
            {showModal ? this.renderForm() : ''}
          </div>
        ) : (
          <h2>Your personal Collections are not setup yet!</h2>
        )}
      </div>
    );
  }
}

CuratedClusters.displayName = 'CuratedClusters';

CuratedClusters.propTypes = {
  userName: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
  curatedClusters: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    name: PropTypes.string,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  }).isRequired,
  clusterId: PropTypes.number.isRequired,
};
