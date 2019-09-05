// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["standard", "plugin:vue/recommended", "prettier", "prettier/standard", "prettier/vue"],
  // required to lint *.vue files
  plugins: ["standard", "vue", "prettier"],
  // add your custom rules here
  rules: {
    "prettier/prettier": [
      "error",
      {
        htmlWhitespaceSensitivity: "ignore",
        semi: true,
        singleQuote: false,
        tabWidth: 4,
        printWidth: 120
      }
    ],
    "vue/no-use-v-if-with-v-for": ["off"],
    "vue/component-name-in-template-casing": ["off"],
    "vue/name-property-casing": ["off"],
    "vue/no-unused-components": ["off"],
    "vue/require-prop-types": 0,
    "vue/order-in-components": 0,
    "vue/require-default-prop": 0,
    "vue/no-v-html": 0,
    eqeqeq: ["off"],
      "no-new": ["off"],
      "no-extend-native": 0,
      "no-new-func": 0
  }
}
