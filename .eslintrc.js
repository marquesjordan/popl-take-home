module.exports = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended", "prettier"],
  plugins: ["react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};