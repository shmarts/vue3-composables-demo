module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'vue-global-api',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
