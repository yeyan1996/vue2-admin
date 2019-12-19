module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "at-rule-no-unknown": null,
    "at-rule-empty-line-before": [
      "always",
      {
        ignoreAtRules: ["else"]
      }
    ],
    "block-closing-brace-newline-after": [
      "always",
      {
        ignoreAtRules: ["if", "else"]
      }
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ]
  }
};
