import App from "next/app";
import Head from "next/head";
import React, { ReactElement } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core";
import { theme as muiTheme } from "../theme/muiTheme";

export default class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render(): ReactElement {
    return (
      <>
        <Head>
          <title>React Challange</title>
          <meta name="theme-color" content="#22922d" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
          <link href="/favicon.ico" type="image/x-icon" />
        </Head>

        <StylesProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AnimatePresence exitBeforeEnter>
              <this.props.Component {...this.props.pageProps} />
            </AnimatePresence>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    );
  }
}
