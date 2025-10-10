module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "max-nesting-depth": 6,
    "selector-max-compound-selectors": null,
    "selector-no-qualifying-type": null,
    "selector-pseudo-element-no-unknown": null,
    "selector-class-pattern": null,
    "property-no-unknown": null,
    "selector-max-id": null,
    "value-no-vendor-prefix": null,
    "selector-no-vendor-prefix": null,
    "property-no-vendor-prefix": null,
    "at-rule-no-vendor-prefix": null,
    "media-feature-name-no-vendor-prefix": null,
    "order/properties-alphabetical-order": null,
    "no-descending-specificity": null
  },
  "ignoreFiles": ["node_modules/**/*", "dist/**/*"]
};
