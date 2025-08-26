import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { error } from "console";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser },rules: {
    
      "no-unused-vars": "error",
      "no-unused-expressions":"error",
      "prefer-const":"error",
      "no-console":"warn",
      "no-undef":"error"
      
    },

  },
  tseslint.configs.recommended,
]);
