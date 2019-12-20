module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "at-rule-no-unknown": null,
    "at-rule-empty-line-before": null,
    "declaration-empty-line-before": null,
    "block-closing-brace-newline-after": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ]
  }
};
