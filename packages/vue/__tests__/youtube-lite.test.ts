// Dependencies
import { render, waitFor } from '@testing-library/vue';
import 'isomorphic-fetch';

// Internals
import { YoutubeLite } from '../src';

const testIds = {
  button: 'le-yt-button',
  iframe: 'le-yt-iframe',
};

const props = {
  urlOrId: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

describe('YoutubeLite', () => {
  it('should render without crash', () => {
    expect(YoutubeLite).toBeTruthy();
  });

  describe('Iframe', () => {
    it('should render after button click', async () => {
      const { getByTestId } = render(YoutubeLite, { props });

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
      });
    });

    it('should render with a custom title', async () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(YoutubeLite, {
        props: {
          title,
          ...props,
        },
      });

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toHaveAttribute('title', title);
      });
    });

    it('should render with www.youtube-nocookie.com as src', async () => {
      const { getByTestId } = render(YoutubeLite, { props });

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube-nocookie.com/);
      });
    });

    it('should render with www.youtube.com as src', async () => {
      const { getByTestId } = render(YoutubeLite, {
        props: {
          noCookie: false,
          ...props,
        },
      });

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube.com/);
      });
    });
  });
});
