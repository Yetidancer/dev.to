import { h, render } from 'preact';
import { CuratedClustersShow } from '../articles/components/CuratedClustersShow';

function loadElement() {
  const root = document.getElementById('Curated-Collections-Container');
  if(root) {
    render(
      <CuratedClustersShow 
        articles={root.dataset.articles}
        cluster={root.dataset.cluster}
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