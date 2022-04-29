// Dependencies
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';
import { SkipNavLink } from '@reach/skip-nav';

class MyDocument extends Document {
  static getInitialProps = createGetInitialProps();

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            crossOrigin=""
            href="https://1GWUBOSFHQ-dsn.algolia.net"
            rel="preconnect"
          />
        </Head>

        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
