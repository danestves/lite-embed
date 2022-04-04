// Dependencies
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { window } from 'browser-monads-ts';
import { useTheme } from 'next-themes';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

// Internals
import '../styles/tailwind.css';
import '../styles/vendor.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  let { setTheme } = useTheme();
  let getLayout = Component.getLayout ?? ((page) => page);

  let theme = (window.localStorage.getItem('theme') as ColorScheme) ?? 'light';

  return (
    <ColorSchemeProvider colorScheme={theme} toggleColorScheme={setTheme}>
      <MantineProvider
        theme={{
          colorScheme: theme,
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
