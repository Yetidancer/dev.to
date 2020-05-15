import { h, render } from 'preact';
import { CuratedClusters } from '../articles/components/CuratedClustersButton';

function loadElement() {
  const root = document.getElementById('Curated-Collections-Button');
  if(root) {
    render(
      <CuratedClusters 
        articleId={root.dataset.article}
        userName={root.dataset.username}
        curatedClusters = {root.dataset.clusters}
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
