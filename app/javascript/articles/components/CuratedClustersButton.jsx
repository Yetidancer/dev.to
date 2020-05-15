import { h, Component } from 'preact';
import { getCsrfToken } from '../../chat/util';

export class CuratedClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCollections: ['one', 'two'],
      showModal: false,
      curatedClusters: [],
    };
  }

  showModal = e => {
    e.preventDefault();
    let updatedState = !this.state.showModal;
    this.setState({ showModal: updatedState });
  };

  renderClusters = () => {
    const { testCollections } = this.state;
    let collecitonHTML = testCollections.map(collection => {
      return <option>{collection}</option>;
    });

    return <select className="dropdown">{collecitonHTML}</select>;
  };

  renderForm = () => {
    const { article_id, user_id } = this.props;
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
                onClick={e => fetchHelper()}
              >
                Submit Cluster
              </a>
              {user_id}
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
function fetchHelper() {
  let payload = JSON.stringify({
    data: 'favorites',
  });

  fetch('/CuratedClusters', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': window.csrfToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      article_body: payload,
    }),
    credentials: 'same-origin',
  });
}

CuratedClusters.displayName = 'CuratedClusters';
