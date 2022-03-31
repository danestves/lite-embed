// Dependencies
import { document } from 'browser-monads-ts';

function addPrefetch(rel: string, href: string, as?: string) {
  let element = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
  if (element) {
    return;
  }

  let linkEl = document.createElement('link');

  linkEl.setAttribute('rel', rel);
  linkEl.setAttribute('href', href);

  if (as) {
    linkEl.setAttribute('as', as);
  }

  document.head.appendChild(linkEl);
}

export default addPrefetch;
