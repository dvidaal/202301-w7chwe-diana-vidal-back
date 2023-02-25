module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
      },
    },
    {
      files: ["src/**/models/**/*.ts"],
      rules: { "@typescript-eslint/naming-convention": "off" },
    },
    {
      files: ["src/**/routers/**/*.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": ["error", { capIsNewExceptions: ["Router"] }],
    "no-implicit-coercion": "off",
  },
};
