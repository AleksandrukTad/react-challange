import React, { ReactElement } from "react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  NextScript
} from "next/document";
import { ServerStyleSheets } from "@material-ui/core";

type MyDocumentProps = {
  API_URL?: string;
};

export default class MyDocument extends Document<MyDocumentProps> {
  static getInitialProps = async (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & MyDocumentProps> => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheets.collect(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        // this is how runtime have to work
        API_URL: process.env.API_URL,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [initialProps.styles, sheets.getStyleElement()]
      };
    } catch (err) {
      console.error(err);
      return { html: "" };
    }
  };

  render(): ReactElement {
    const { API_URL } = this.props;
    return (
      <html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.env = { API_URL: "${API_URL}" }`
            }}
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
