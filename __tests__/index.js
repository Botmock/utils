import { enumeratePaths, createIntentMap, createNodeCollector } from '../src';

describe.skip('enumeratePaths', () => {
  test('returns a set', () => {
    expect(enumeratePaths() instanceof Set).toBeTruthy();
  });
});

describe('createIntentMap', () => {
  test('returns a map', () => {
    expect(createIntentMap() instanceof Map).toBeTruthy();
  });
});

describe('createNodeCollector', () => {
  test('returns a function', () => {
    expect(createNodeCollector() instanceof Function).toBeTruthy();
  });
});
