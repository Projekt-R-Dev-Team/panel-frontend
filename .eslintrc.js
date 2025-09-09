module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-shadow": ["error", { allow: ["state", "getters"] }],
    "no-param-reassign": "off",
    "comma-dangle": ["error", "never"],
    "vue/no-mutating-props": "off"
  },

  parserOptions: {
    parser: "babel-eslint"
  }
};
