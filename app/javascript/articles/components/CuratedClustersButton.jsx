import { h, Component } from 'preact';
import PropTypes from 'prop-types';

export class CuratedClusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      clusterId: this.props.curatedClusters[0].id,
      success:false
    };
  }

  showModal = e => {
    e.preventDefault();
    const { showModal } = this.state;
    const updatedState = !showModal;
    this.setState({ showModal: updatedState });
  };

  selectHelper = e => {
    this.setState({ clusterId: e.target.value });
  };

  fetchHelper = () => {
    const { articleId, userName } = this.props;
    const { clusterId } = this.state;
    const payload = JSON.stringify({
      user_name: userName,
      article_id: articleId,
      cluster_id: clusterId,
    });
    fetch(`/users/${userName}/curated_cluster_articles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': window.csrfToken,
        'Content-Type': 'application/json',
      },
      body: payload,
      credentials: 'same-origin',
    }).then(() => this.setState({success:true}));
  };

  renderClusters = () => {
    const { curatedClusters } = this.props;
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
    const {curatedClusters} = this.props;
    const {success} = this.state;
    if(curatedClusters.length<0){
      return(
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
            <section className="modal-content">You currently have no collections</section>
          </div>
        </div>
      )
    }

    return (

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
              {success?<div>Your article was added!</div>:''}
            </footer>
          </div>
        </div>

    );
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <div>
          <button id="modal" onClick={e => this.showModal(e)} type="submit">
            Add to Collections
          </button>
          {showModal ? this.renderForm() : ''}
        </div>
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
};
