// Dependencies
import * as React from 'react';
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
  let getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
