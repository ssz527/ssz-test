module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "ENV": true,
    "ol": true,
    "goog": true,
    "hdmap": true
  },
  "extends": "standard",
  // "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      0,
      "always"
    ]
  }
}