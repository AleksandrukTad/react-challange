/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const withOffline = require("next-offline");
const { compose } = require("lodash/fp");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { resolve } = require("path");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSourceMaps = require("@zeit/next-source-maps");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const tsconfigPaths = ["tsconfig.json"];

const webpackConfig = {
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.resolve.plugins = tsconfigPaths.map(
      configFile => new TsconfigPathsPlugin({ configFile })
    );

    return config;
  }
};

const withBundleAnalyzerConfig = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html"
    }
  }
};

module.exports = compose(
  withSourceMaps,
  withBundleAnalyzer,
  withOffline
)({
  // target: "serverless", // TODO: ENABLE - TEMP FOR POC TO HAVE RUNTIME ENVS
  devtool: "hidden-source-map",
  poweredByHeader: false,
  ...webpackConfig,
  ...withBundleAnalyzerConfig,
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? "service-worker.js"
      : "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  },
  experimental: {
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js"
        }
      ];
    }
  }
});
