const { createIntentMap } = require('../');

test('returns a Map', () => {
  expect(createIntentMap()).toEqual(new Map());
});
