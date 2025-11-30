import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: ["**/.output/**", "**/.nuxt/**", "**/node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser, 
      parserOptions: {
        parser: tsParser, 
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
