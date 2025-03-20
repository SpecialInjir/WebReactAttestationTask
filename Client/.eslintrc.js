const baseExtends = [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:unicorn/recommended",
  "plugin:promise/recommended"
];

const basePlugins = [
  "react",
  "react-hooks",
  "unicorn",
  "promise",
  "compat"
];
const jsExtensions = [".js", ".jsx", ".json"];
const tsExtensions = [".ts", ".tsx"];
const allExtensions = jsExtensions.concat(tsExtensions);

module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    ...baseExtends,
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      legacyDecorators: true
    },
    sourceType: "module"
  },
  plugins: [
    ...basePlugins,
    "import"
  ],
  settings: {
    polyfills: ["fetch"],
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: allExtensions
      }
    }
  },
  rules: {
    // Possible Errors
    "valid-jsdoc": [
      "error",
      {
        "requireParamDescription": false,
        "requireReturnDescription": false,
        "requireReturnType": false,
        "requireReturn": false
      }
    ],
    "no-async-promise-executor": "error",
    // Best Practices
    "block-scoped-var": "error",
    "consistent-return": "error",
    "no-extra-bind": "error",
    "no-implicit-globals": "error",
    "no-multi-spaces": "error",
    "yoda": "error",
    // Stylistic Issues
    "block-spacing": "error",
    "brace-style": [
      "error",
      "stroustrup",
      {
        "allowSingleLine": true
      }
    ],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "prefer-object-spread": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "singleValue": true,
        "objectsInArrays": false
      }
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": "error",
    "keyword-spacing": "error",
    "no-spaced-func": "error",
    "space-before-blocks": "error",
    "space-unary-ops": "error",
    "eqeqeq": ["error", "smart"],
    "prefer-arrow-callback": ["error"],
    "rest-spread-spacing": ["error", "never"],
    "no-confusing-arrow": ["error", {
      "allowParens": true
    }],
    // ECMAScript 6
    "arrow-spacing": "error",
    "no-useless-constructor": "error",
    "no-useless-return": "error",
    "no-var": "error",
    // Unicode
    "unicode-bom": ["error", "never"],
    // Import
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/export": "error",
    "import/no-absolute-path": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-mutable-exports": "error",
    "import/imports-first": "error",
    "import/no-deprecated": "error",
    "import/order": "error",
    "import/newline-after-import": "error",
    "import/no-named-default": "error",
    "import/no-duplicates": "error",
    "import/no-useless-path-segments": "error",
    // unicorn
    "unicorn/catch-error-name": "off",
    // react
    "react/display-name": "off",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-deprecated": 0,
    "react/no-did-mount-set-state": ["error", "disallow-in-func"],
    "react/no-did-update-set-state": ["error", "disallow-in-func"],
    "react/no-multi-comp": ["error", {
      "ignoreStateless": true
    }],
    "react/no-string-refs": "error",
    "react/no-unused-state": "error",
    "react/no-unescaped-entities": "error",
    "react/prefer-es6-class": ["error", "always"],
    "react/prefer-stateless-function": "error",
    "react/self-closing-comp": "error",
    "react/style-prop-object": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-closing-bracket-location": ["error", "after-props"],
    "react/jsx-curly-spacing": ["error", "never"],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-key": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never"
    }],
    "react/sort-comp": [
      "error",
      {
        order: [
          "type-annotations",
          "lifecycle",
          "static-methods",
          "everything-else",
          "rendering"
        ],
        groups: {
          rendering: [
            "/^render.+$/",
            "render"
          ]
        }
      }
    ],
    "react/void-dom-elements-no-children": "error",
    "promise/prefer-await-to-then": "error",
    "promise/prefer-await-to-callbacks": "error",
    "promise/avoid-new": "off",
    // autobind
    "react/jsx-no-bind": ["error", {
      "ignoreRefs": true,
      "allowArrowFunctions": true,
      "allowBind": false
    }],
    "unicorn/prefer-add-event-listener": "off",
    // react-hooks
    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    {
      parser: "@typescript-eslint/parser",
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
          legacyDecorators: true
        },
        sourceType: "module",
        project: "./tsconfig.json"
      },
      extends: [
        ...baseExtends,
        // Отключаем правила из базового набора
        "plugin:@typescript-eslint/eslint-recommended",
        // Базовые правила для TypeScript
        "plugin:@typescript-eslint/recommended",
        // Правила TS, требующие инфо о типах
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      plugins: [
        ...basePlugins,
        // "eslint-plugin-import",
        // "eslint-plugin-jsdoc",
        "import",
        "eslint-plugin-prefer-arrow",
        "@typescript-eslint",
        "@typescript-eslint/tslint",
      ],
      settings: {
        polyfills: ["fetch"],
        react: {
          version: "detect"
        },
        'import/extensions': allExtensions,
        'import/parsers': {
          '@typescript-eslint/parser': tsExtensions
        },
        'import/resolver': {
          'node': {
            'extensions': allExtensions
          }
        },
      },
      rules: {
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
          "error",
          {
            "default": "generic"
          }
        ],
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            "accessibility": "explicit",
            "overrides": { "constructors": "no-public" }
          }
        ],
        "@typescript-eslint/indent": [
          "error",
          2,
          {
            "SwitchCase": 1
          }
        ],
        "@typescript-eslint/member-delimiter-style": [
          "error",
          {
            "multiline": {
              "delimiter": "semi",
              "requireLast": true
            },
            "singleline": {
              "delimiter": "semi",
              "requireLast": false
            }
          }
        ],
        "@typescript-eslint/member-ordering": "off",
        // todo: Надо разобраться подробнее и состыковать его с нашим соглащением
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-shadow": [
          "error",
          {
            "hoist": "all"
          }
        ],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unused-expressions": [ "off" ],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "off",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/quotes": [ "off" ],
        "@typescript-eslint/semi": [
          "error",
          "always"
        ],
        "@typescript-eslint/triple-slash-reference": [
          "error",
          {
            "path": "always",
            "types": "prefer-import",
            "lib": "always"
          }
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/require-await": "error",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-extra-semi": "off",
        // import
        // todo правила которые не могут работать и с ts и c flow
        "import/default": "off",
        "import/no-deprecated": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-unassigned-import": [2, { "allow": ["**/*.css"] }],
        "import/order": ["error", {
          "newlines-between": "always-and-inside-groups",
          "groups": [["builtin", "external", "internal"], "parent", "sibling", "index"]}],
        // разное
        "semi": "off",
        "promise/prefer-await-to-then": "off",
        "no-useless-constructor": "off",
        "valid-jsdoc": "off",
        "arrow-body-style": "off",
        "arrow-parens": [
          "off",
          "always"
        ],
        "brace-style": [
          "error",
          "stroustrup",
          {
            "allowSingleLine": true
          }
        ],
        "comma-dangle": [
          "error",
          {
            "objects": "never",
            "arrays": "never",
            "functions": "never"
          }
        ],
        "complexity": "off",
        "constructor-super": "error",
        "curly": "off",
        "eol-last": "off",
        "eqeqeq": [
          "error",
          "smart"
        ],
        "guard-for-in": "off",
        "id-match": "error",
        "promise/prefer-await-to-callbacks": "off",
        "linebreak-style": [
          "error",
          "windows"
        ],
        "max-classes-per-file": "off",
        "max-len": "off",
        "new-parens": "error",
        "no-bitwise": "off",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-duplicate-imports": "error",
        "no-empty": "off",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "error",
        "no-irregular-whitespace": "error",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-null/no-null": "off",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "object-shorthand": "off",
        "one-var": [
          "off",
          "never"
        ],
        "padding-line-between-statements": [
          "off",
          {
            "blankLine": "always",
            "prev": "*",
            "next": "return"
          }
        ],
        "prefer-const": "error",
        "prefer-template": "off",
        "quote-props": [
          "error",
          "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
          "error",
          {
            "anonymous": "never",
            "asyncArrow": "always",
            "named": "never"
          }
        ],
        "spaced-comment": [ "error", "always", {
          "line": {
            "markers": ["#region", "#endregion", "region", "endregion"]
          }
        }],
        "use-isnan": "error",
        "valid-typeof": "off",
        //unicorn
        "unicorn/prefer-add-event-listener": "off",
        "unicorn/catch-error-name": "off",
        "unicorn/prefer-spread": "off",
        "unicorn/no-abusive-eslint-disable": "off", // не понимает @typescript-eslint
        //react
        "react/display-name": "off",
        "react/jsx-closing-bracket-location": [2, "line-aligned"],
        "react/prop-types": "off",
        "react/sort-comp": "off",
        "react/no-did-mount-set-state": "off",
        "react/no-did-update-set-state": "off",
        // react-hooks
        "react-hooks/exhaustive-deps": "error",
      }
    }
  ]
};
