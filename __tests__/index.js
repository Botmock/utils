const { createIntentMap, getIntermediateNodes } = require('../');

test('`createIntentMap` returns a map', () => {
  expect(createIntentMap()).toEqual(new Map());
});

test('`getIntermediateNodes` returns a function', () => {
  expect(() => {
    getIntermediateNodes();
  }).not.toThrow();
  expect(getIntermediateNodes() instanceof Function).toBeTruthy();
});
