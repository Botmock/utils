import { createIntentMap, createNodeCollector } from '../src';

test('createIntentMap returns a map', () => {
  expect(createIntentMap() instanceof Map).toBeTruthy();
});

test('createNodeCollector returns a function', () => {
  expect(createNodeCollector() instanceof Function).toBeTruthy();
});
