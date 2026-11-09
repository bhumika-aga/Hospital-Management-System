import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      // Same hook rules CRA's "react-app" preset enforced.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // CRA reported unused variables as warnings, not errors.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none", caughtErrors: "none", ignoreRestSiblings: true },
      ],
      // The codebase uses `any` in many places; flag it without failing the lint run.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
