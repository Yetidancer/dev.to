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

  showModal = (e) => {
    e.preventDefault()
    let updatedState = !this.state.showModal;
    this.setState({ showModal: updatedState });
  };
  
  
  
  
  render() {
    const { article_id, article_creator } = this.props;
    const {showModal} = this.state;
    return (
      <div>
        <button id="modal" onClick={(e) => this.showModal(e)} type="submit">
          Add to Collections
        </button>
        {showModal ? <div>{article_id}<a className="cta top-bar--link write" id ="sumbitCollection" onClick = {(e)=>fetchHelper()}>Submit Cluster</a></div> : ''}
      </div>
    );
  }
}
function fetchHelper(){
  let payload = JSON.stringify({
    data:'favorites'
  })

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
  })

  
}

CuratedClusters.displayName = 'CuratedClusters';

/*
Todo:
Add helper function for submitting data
AddArticleToCollection = (articleID,collectionID) => {
  let body = JSON.stringify(
    {
      data:{
        articleID:articleID,
        collectionID:collectionID
      }
    }
  ) 

  
  fetch('localhost:3000/curated_collection/create',{
    method = 'POST',
    header = 'Application/JSON'
    body = {stringifiedBody}
  })

}



*/
