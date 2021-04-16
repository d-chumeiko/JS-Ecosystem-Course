import assert from 'assert';
import { chunkArray, convertStringToCamelCase } from '../scripts';

// chunkArray convertStringToCamelCase

// testing string
assert.strictEqual(convertStringToCamelCase('__FOO_BAR__'), 'fooBar', 'Should be true (__FOO_BAR__ => fooBar)');
assert.strictEqual(convertStringToCamelCase('Foo Bar'), 'fooBar', 'Should be true (Foo Bar => fooBar)');
assert.strictEqual(convertStringToCamelCase(''), '', 'Should be true ("" => "")');

// testing array
assert.ok(
  chunkArray([1, 2, 3, 4, 5], 2),
  [[1, 2], [3, 4], [5]],
  'should be true. expected result: [[1, 2], [3, 4], [5]]'
);
assert.ok(chunkArray([1], 5), [[1]], 'Should be true. Expected result: [[1]] ');
assert.ok(chunkArray(), [], 'Should be true. Expected result: [] ');
