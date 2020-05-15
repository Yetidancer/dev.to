import { h, render } from 'preact';
import { CuratedClusters } from '../articles/components/CuratedClustersButton';

function loadElement() {
  const root = document.getElementById('Curated-Collections-Button');
  if(root) {
    render(
      <CuratedClusters 
        article_id={root.dataset.article}
        user_id={root.dataset.userid}
        clusters = {root.dataset.clusters}
      />,
      root,
      root.firstElementChild,
    );
  }
}

window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
