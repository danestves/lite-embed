// Dependencies
import Document, { Head, Html, Main, NextScript } from "next/document";
import { SkipNavLink } from "@reach/skip-nav";
import type { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head />

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
