module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: ["/lib/**/*", "/node_modules/**/*"],
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
        moduleDirectory: ["node_modules", "src/"], // Help resolve local modules
      },
    },
  },
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", {code: 120}],
    "linebreak-style": ["error", "unix"],
    "eol-last": ["error", "always"],
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-unresolved": "off", // Temporarily disable until resolved
  },
};
