import * as utils from "../src";

describe("intent map creation", () => {
  test("returns a map", () => {
    expect(utils.createIntentMap([], []) instanceof Map).toBe(true);
  });
});

describe("node collector creation", () => {
  test("returns a function", () => {
    const fn = utils.createMessageCollector(
      utils.createIntentMap([], []),
      () => {}
    );
    expect(fn instanceof Function).toBe(true);
  });
});

// describe("topological sorting", () => {
//   test("returns an array of messages", () => {
//     expect(utils.topoSort([]) instanceof Array).toBe(true);
//   });
//   test.todo("returns sorted array");
// });
