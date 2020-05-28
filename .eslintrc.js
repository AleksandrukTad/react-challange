module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  env: {
    browser: true,
    amd: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ["react", "jsx-a11y", "@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true
      }
    ],
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        prefixWithI: "always"
      }
    ],
    "no-console": ["error", { allow: ["error", "warn", "info"] }]
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  parser: "@typescript-eslint/parser" // Specifies the ESLint parser
};
