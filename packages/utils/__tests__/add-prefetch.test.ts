// Internals
import { addPrefetch } from '../src';

describe('addPrefetch()', () => {
  describe('YouTube', () => {
    it('should add prefetch links to head', async () => {
      addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
      addPrefetch('preconnect', 'https://www.google.com');

      const links = [
        'https://www.youtube-nocookie.com',
        'https://www.google.com',
      ];

      const head = document.head;
      const linkElements = head.querySelectorAll('link');

      for (let i = 0; i < linkElements.length; i++) {
        expect(linkElements[i].href).toBe(links[i]);
      }
    });
  });
});
