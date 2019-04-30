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
  test.todo('handles loops');
  test.todo('handles multi edges');
  test.todo('handles simple graphs');
  test.todo('flattened set has length exponential in the number of nodes');
});

describe('createIntentMap', () => {
  test('returns a map', () => {
    expect(createIntentMap() instanceof Map).toBeTruthy();
  });
  test.todo('does not contain message not following an intent');
});

describe('createNodeCollector', () => {
  test('returns a function', () => {
    expect(createNodeCollector() instanceof Function).toBeTruthy();
  });
  test.todo('returned function does not collect nodes connected by intents');
});
