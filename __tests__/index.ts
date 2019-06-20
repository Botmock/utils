import { createIntentMap, createMessageCollector } from "../src";

describe("intent map creation", () => {
  test("returns a map", () => {
    expect(createIntentMap([], []) instanceof Map).toBe(true);
  });
});

describe("node collector creation", () => {
  test("returns a function", () => {
    const fn = createMessageCollector(createIntentMap([], []), () => {});
    expect(fn instanceof Function).toBe(true);
  });
});
