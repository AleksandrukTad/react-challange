module.exports = {
  env: {
    development: {
      plugins: [["add-react-displayname"]],
      presets: [
        [
          "next/babel",
          {
            "preset-env": {
              targets: {
                browsers: "> 5%"
              }
            }
          }
        ]
      ]
    },
    production: {
      plugins: [["add-react-displayname"]],
      presets: [
        [
          "next/babel",
          {
            "preset-env": {
              targets: {
                browsers: "> 5%"
              }
            }
          }
        ]
      ]
    },
    test: {
      plugins: [
        ["add-react-displayname"],
        ["transform-dynamic-import"],
        ["@babel/plugin-proposal-export-default-from"]
      ],
      presets: [
        [
          "env",
          {
            targets: {
              node: "current"
            }
          }
        ],
        [
          "next/babel",
          {
            "preset-env": {
              modules: "commonjs"
            }
          }
        ]
      ]
    }
  }
};
