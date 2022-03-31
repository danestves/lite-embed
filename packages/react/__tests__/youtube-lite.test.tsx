// Dependencies
import '@testing-library/jest-dom';

// Internals
import { render } from '../other/test.utils';
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
    it('should render after button click', () => {
      const { getByTestId } = render(<YoutubeLite {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
    });

    it('should render with a custom title', () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(<YoutubeLite title={title} {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe).toHaveAttribute('title', title);
    });

    it('should render with www.youtube-nocookie.com as src', () => {
      const { getByTestId } = render(<YoutubeLite {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe.src).toMatch(/youtube-nocookie.com/);
    });

    it('should render with www.youtube.com as src', () => {
      const { getByTestId } = render(
        <YoutubeLite noCookie={false} {...props} />
      );

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe.src).toMatch(/youtube.com/);
    });
  });
});
