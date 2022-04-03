// Dependencies
import { render } from '@testing-library/react';
import 'isomorphic-fetch';

// Internals
import { VimeoLite } from '../src';
import type { VimeoLiteProps } from '../src/types';

const props: VimeoLiteProps = {
  urlOrId: 'https://vimeo.com/148751763',
};

describe('VimeoLite', async () => {
  it('should render without crash', () => {
    render(<VimeoLite {...props} />);
  });

  describe('Iframe', () => {
    it('should render after button click', () => {
      const { getByTestId } = render(<VimeoLite {...props} />);

      const button = getByTestId('vimeo-lite-button') as HTMLButtonElement;
      button.click();

      const iframe = getByTestId('vimeo-lite-iframe') as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
    });

    it('should render with a custom title', () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(<VimeoLite title={title} {...props} />);

      const button = getByTestId('vimeo-lite-button') as HTMLButtonElement;
      button.click();

      const iframe = getByTestId('vimeo-lite-iframe') as HTMLIFrameElement;
      expect(iframe).toHaveAttribute('title', title);
    });
  });
});
