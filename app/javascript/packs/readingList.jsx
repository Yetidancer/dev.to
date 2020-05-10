import { h, render } from 'preact';
//generates CSRF token, internal site token
import { getUserDataAndCsrfToken } from '../chat/util';
//imports readinglist component
import { ReadingList } from '../readingList/readingList';


function loadElement() {
  getUserDataAndCsrfToken().then(({ currentUser }) => {
    //creates root to attach the rest of the reading list component to. "Parent Component"
    const root = document.getElementById('reading-list');
    if (root) {
      render(
        <ReadingList
          availableTags={currentUser.followed_tag_names}
          statusView={root.dataset.view}
        />,
        root,
        root.firstElementChild,
      );
    }
  });
}
// begins prerender through instaclick before actual click.
window.InstantClick.on('change', () => {
  loadElement();
});

loadElement();
