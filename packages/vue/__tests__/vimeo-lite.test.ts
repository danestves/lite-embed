// Dependencies
import { render, waitFor } from '@testing-library/vue';
import 'isomorphic-fetch';

// Internals
import { VimeoLite } from '../src';

const testIds = {
  button: 'le-vi-button',
  iframe: 'le-vi-iframe',
};

const props = {
  urlOrId: 'https://vimeo.com/148751763',
};

describe('VimeoLite', () => {
  it('should render without crash', () => {
    expect(VimeoLite).toBeTruthy();
  });

  describe('Iframe', () => {
    it('should render after button click', async () => {
      const { getByTestId } = render(VimeoLite, { props });

      const button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        const iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
      });
    });

    it('should render with a custom title', async () => {
      const title = 'Rick Astley - Never Gonna Give You Up';
      const { getByTestId } = render(VimeoLite, {
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
  });
});
