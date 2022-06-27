/**
 * @fileoverview Prevents usage of && condition in JSX Embeds.
 * @author Anees Iqbal <i@steelbrain.me>
 */

'use strict'

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: 'Prevents usage of && condition in JSX embed',
      category: 'Best Practices',
      recommended: false,
      url: 'https://github.com/steelbrain/eslint-plugin-react/commit/dcfa20b453984bbd7c8a3033d2e29691939ef1c1#diff-963d345c34fff716a6cec44c45c1c2fcb9a27445ae105e0f2378eeefdb1fe8c4',
    },
    schema: [],
  },
  create: function (context) {
    return {
      JSXExpressionContainer(node) {
        if (
          node.parent == null ||
          node.parent.type !== 'JSXElement' ||
          node.expression == null ||
          node.expression.type !== 'LogicalExpression' ||
          node.expression.operator === '??'
        ) {
          return
        }
        context.report({
          node,
          message:
            'Using && to condition JSX embeds is forbidden. Convert it to a ternary operation instead',
        })
      },
    }
  },
}
 