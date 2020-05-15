import { h, Component } from 'preact';
import { getCsrfToken } from '../../chat/util';

export class CuratedClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      curatedClusters: [],
      currentArticle: '',
      currentUserName: '',
      clusterId: null,
    };
  }

  componentDidMount = () => {
    const { articleId, userName, curatedClusters } = this.props;
    const clusterList = JSON.parse(curatedClusters);
    //add in some edge cases for empty clusters
    const clusterId = clusterList[0];
    const currentUser = userName;
    const currentArticle = articleId;
    this.setState({
      curatedClusters: clusterList,
      currentUserName: currentUser,
      currentArticle: currentArticle,
      clusterId: clusterId,
    });
  };

  showModal = e => {
    e.preventDefault();
    let updatedState = !this.state.showModal;
    this.setState({ showModal: updatedState });
  };

  selectHelper = e => {
    this.setState({ clusterId: e.target.value });
    console.log('clusterid:', this.state.clusterId);
    console.log('userName:', this.state.currentArticle);
    console.log('articleId:', this.state.clusterId);
  };

  fetchHelper = () => {
    const { articleId, userName, clusterId } = this.props;
    let payload = JSON.stringify({
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
    let collecitonHTML = curatedClusters.map(cluster => {
      return <option value={`${cluster.id}`}>{cluster.name}</option>;
    });

    return (
      <select className="dropdown" onchange={e => this.selectHelper(e)}>
        {collecitonHTML}
      </select>
    );
  };

  renderForm = () => {
    const { article_id, username, clusters } = this.props;
    return (
      <div>
        <div class="modal" id="modal1">
          <div class="modal-dialog">
            <header class="modal-header">
              <div class="close-modal">
                <button
                  onClick={e => this.showModal(e)}
                  aria-label="close modal"
                >
                  ✕
                </button>
              </div>
            </header>
            <section class="modal-content">{this.renderClusters()}</section>
            <footer class="modal-footer">
              <a
                className="cta top-bar--link write"
                id="sumbitCollection"
                onClick={e => this.fetchHelper()}
              >
                Submit Cluster
              </a>
            </footer>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <button id="modal" onClick={e => this.showModal(e)} type="submit">
          Add to Collections
        </button>
        {showModal ? this.renderForm() : ''}
      </div>
    );
  }
}

CuratedClusters.displayName = 'CuratedClusters';
