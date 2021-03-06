const assert = require('assert');
const {
  writeJSON,
  readFile,
  formatCompileError,
} = require('../lib/utils');

describe('Utils', () => {
  it('.writeJSON', () => {
    return writeJSON('/tmp/output.json', { a: 1 })
      .then(() => readFile('/tmp/output.json'))
      .then(str => assert.deepStrictEqual({ a: 1 }, JSON.parse(str)));
  });

  it('.formatCompileError', () => {
    let expected = ['Line 1: foo()', '        ^^^^^', 'Bad!'].join('\n');

    let result = formatCompileError('foo()', {
      node: {
        loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 5 } },
      },
      message: 'Bad!',
    });

    assert.strictEqual(expected, result);
  });
});
