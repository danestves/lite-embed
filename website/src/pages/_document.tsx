// Dependencies
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';
import { SkipNavLink } from '@reach/skip-nav';
import endent from 'endent';

class MyDocument extends Document {
  static getInitialProps = createGetInitialProps();

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: endent`
            const faviconTag = document.getElementById("favicon");
            const isDark = window.matchMedia("(prefers-color-scheme: dark)");

            const changeFavicon = () => {
              if (isDark.matches) faviconTag.href = "/favicon-dark.ico";
              else faviconTag.href = "/favicon.ico";
            };

            changeFavicon();

            setInterval(changeFavicon, 1000);
          `,
            }}
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
