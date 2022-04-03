// Dependencies
import { render, waitFor } from '@testing-library/react';
import 'isomorphic-fetch';

// Internals
import { VimeoLite } from '../src';
import type { VimeoLiteProps } from '../src/types';

const testIds = {
  button: 'le-vi-button',
  iframe: 'le-vi-iframe',
};

const props: VimeoLiteProps = {
  urlOrId: 'https://vimeo.com/148751763',
};

describe('VimeoLite', async () => {
  it('should render without crash', () => {
    render(<VimeoLite {...props} />);
  });

  describe('Iframe', () => {
    it('should render after button click', async () => {
      const { getByTestId } = render(<VimeoLite {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
      });
    });

    it('should render with a custom title', async () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(<VimeoLite title={title} {...props} />);

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toHaveAttribute('title', title);
      });
    });
  });
});
