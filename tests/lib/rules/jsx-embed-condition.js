/**
 * @fileoverview Prevents usage of && condition in JSX Embeds.
 * @author Anees Iqbal <i@steelbrain.me>
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/jsx-embed-condition');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-embed-condition', rule, {
  valid: [].concat({
    code: '<App>Test</App>'
  }, {
    code: '<App test>Another</App>'
  }, {
    code: '<App foo={e => bar(e)}>Hello World</App>'
  }, {
    code: '<App>{x ? <div></div> : null}</App>'
  }, {
    code: '<App>{x ? <div>Hello</div> : null}</App>'
  }, {
    code: '<App>{x ? <div>{y ? <y /> : <z />}</div> : null}</App>'
  }, {
    code: '<App x={x && y}>{x ? <div>{y ? <y /> : <z />}</div> : null}</App>'
  }),

  invalid: [{
    code: '<div>{x && <div />}</div>',
    output: '<div>{x && <div />}</div>',
    errors: [
      {message: 'Using && to condition JSX embeds is forbidden. Convert it to a ternary operation instead'}
    ]
  }, {
    code: '<div>{x ? <div>{y && <div />}</div> : null}</div>',
    output: '<div>{x ? <div>{y && <div />}</div> : null}</div>',
    errors: [
      {message: 'Using && to condition JSX embeds is forbidden. Convert it to a ternary operation instead'}
    ]
  }]
});
