import { h, render } from 'preact';
import { CuratedClusters } from '../articles/components/CuratedClustersButton';

function loadElement() {
  const root = document.getElementById('Curated-Collections-Button');
  if(root) {
    render(
      <CuratedClusters 
        article_id={root.dataset.article}
        article_creator={root.dataset.articlecreator}
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




// import { h, render } from 'preact';
// import { CuratedCollectionsButton } from '../articles/components/CuratedCollectionsButton';

// HTMLDocument.prototype.ready = new Promise(resolve => {
//   if (document.readyState !== 'loading') {
//     return resolve();
//   }
//   document.addEventListener('DOMContentLoaded', () => resolve());
//   return null;
// });

// function loadComponent() {
//     const root = document.getElementById('Curated-Collections-Button');
//     render(
//       <CuratedCollectionsButton 
//         something = {root.dataset.something}
//       />,
//       root,
//       root.firstElementChild,
//     );
// }

// document.ready.then(() => {
//   loadComponent();
//   window.InstantClick.on('change', () => {
//     if (document.getElementById('Curated-Collections-Button')) {
//       loadComponent();
//     }
//   });
// });