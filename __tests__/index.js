import { enumeratePaths, createIntentMap, createNodeCollector } from '../src';

describe('enumeratePaths', () => {
  test('throws if not given root', () => {
    expect(() => {
      enumeratePaths();
    }).toThrow();
  });
  test('returns a set', () => {
    expect(
      enumeratePaths([
        { is_root: true, message_id: 0, next_message_ids: [] }
      ]) instanceof Set
    ).toBeTruthy();
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
