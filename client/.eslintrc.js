module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
  },
  "settings": {
    "import/resolver": "webpack",
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/anchor-is-valid": 0,
  },
};
