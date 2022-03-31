// Internals
import { getVimeoId } from '../src';

describe('getVimeoId()', () => {
  it('should return the correct vimeo id given an array of vimeo urls', () => {
    const urls = [
      'https://vimeo.com/6701902',
      'https://vimeo.com/670190233',
      'https://player.vimeo.com/video/67019023',
      'https://player.vimeo.com/video/6701902',
      'https://player.vimeo.com/video/67019022?title=0&byline=0&portrait=0',
      'https://player.vimeo.com/video/6719022?title=0&byline=0&portrait=0',
      'https://vimeo.com/channels/vimeogirls/6701902',
      'https://vimeo.com/channels/vimeogirls/67019023',
      'https://vimeo.com/channels/staffpicks/67019026',
    ];

    const ids = [
      '6701902',
      '670190233',
      '67019023',
      '6701902',
      '67019022',
      '6719022',
      '6701902',
      '67019023',
      '67019026',
    ];

    for (let i = 0; i < urls.length; i++) {
      expect(getVimeoId(urls[i])).toBe(ids[i]);
    }
  });
});
