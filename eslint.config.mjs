import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "spaced-comment": ["error", "always"],
      "capitalized-comments": [
        "error",
        "always",
        { ignoreConsecutiveComments: true },
      ],
      "no-inline-comments": "warn",
    },
  },
  pluginJs.configs.recommended,
];
