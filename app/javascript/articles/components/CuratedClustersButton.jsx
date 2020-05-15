import { h, Component } from 'preact';
import { getCsrfToken } from '../../chat/util';

export class CuratedClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      curatedClusters: [],
    };
  }

  componentDidMount = () => {
    let updatedState = JSON.parse(this.props.clusters);
    this.setState({curatedClusters:updatedState})
  }

  showModal = e => {
    e.preventDefault();
    let updatedState = !this.state.showModal;
    this.setState({ showModal: updatedState });
 
    console.log(this.state.curatedClusters)
  };

  renderClusters = () => {
    const { curatedClusters } = this.state;
    let collecitonHTML = curatedClusters.map(cluster => {
      return <option>{cluster.name}</option>;
    });

    return <select className="dropdown">{collecitonHTML}</select>;
  };

  renderForm = () => {
    const { article_id, username,clusters } = this.props;
    return (
      <div>
        <div class="modal" id="modal1">
          <div class="modal-dialog">
            <header class="modal-header">
              <div class="close-modal">
                {username}
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
                onClick={e => fetchHelper(username)}
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
function fetchHelper(username) {
  let payload = JSON.stringify({
    data: 'favorites',
  });

  fetch(`/users/${username}/curated_clusters`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': window.csrfToken,
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(data=>console.log(data))
}

CuratedClusters.displayName = 'CuratedClusters';

// fetch('/CuratedClusters', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'X-CSRF-Token': window.csrfToken,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     article_body: payload,
//   }),
//   credentials: 'same-origin',
// });
