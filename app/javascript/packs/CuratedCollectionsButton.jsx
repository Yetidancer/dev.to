import { h, render } from 'preact';
import { CuratedCollectionsButton } from '../articles/components/CuratedCollectionsButton';

HTMLDocument.prototype.ready = new Promise(resolve => {
  if (document.readyState !== 'loading') {
    return resolve();
  }
  document.addEventListener('DOMContentLoaded', () => resolve());
  return null;
});

function loadComponent() {
    const root = document.getElementById('Curated-Collections-Button');
    render(
      <CuratedCollectionsButton 
        something = {root.dataset.something}
      />,
      root,
      root.firstElementChild,
    );
}

document.ready.then(() => {
  loadComponent();
  window.InstantClick.on('change', () => {
    if (document.getElementById('Curated-Collections-Button')) {
      loadComponent();
    }
  });
});


