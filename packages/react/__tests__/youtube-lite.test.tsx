// Dependencies
import { render, waitFor } from '@testing-library/react';

// Internals
import { YoutubeLite } from '../src';
import type { YouTubeLiteProps } from '../src/types';

const testIds = {
  button: 'le-yt-button',
  iframe: 'le-yt-iframe',
};

const props: YouTubeLiteProps = {
  urlOrId: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

describe('YoutubeLite', async () => {
  it('should render without crash', () => {
    render(<YoutubeLite {...props} />);
  });

  describe('Iframe', () => {
    it('should render after button click', async () => {
      const { getByTestId } = render(<YoutubeLite {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
      });
    });

    it('should render with a custom title', async () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(<YoutubeLite title={title} {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toHaveAttribute('title', title);
      });
    });

    it('should render with www.youtube-nocookie.com as src', async () => {
      const { getByTestId } = render(<YoutubeLite {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube-nocookie.com/);
      });
    });

    it('should render with www.youtube.com as src', async () => {
      const { getByTestId } = render(
        <YoutubeLite noCookie={false} {...props} />
      );

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube.com/);
      });
    });
  });
});
