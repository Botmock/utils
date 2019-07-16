import * as utils from "../src";

// describe.skip("intent map inversion", () => {
//   test("returns a map", () => {
//     const intentMap = utils.createIntentMap([], []);
//     expect(utils.invertIntentMap(intentMap) instanceof Map).toBe(true);
//   });
// });

describe.skip("symmetric wrap", () => {});

describe("intent map creation", () => {
  test("returns a map", () => {
    expect(utils.createIntentMap([], []) instanceof Map).toBe(true);
  });
  test.todo("map has string keys and array values");
});

describe("message collector creation", () => {
  test("returns a function", () => {
    const fn = utils.createMessageCollector(
      utils.createIntentMap([], []),
      () => {}
    );
    expect(fn instanceof Function).toBe(true);
  });
  test.todo("returned function returns an array of message ids");
});

describe("topological sorting", () => {
  const FIRST_MESSAGE_ID = "d7f423ca-8147-4b64-8b7b-b1c07cc1b9fc";
  const SECOND_MESSAGE_ID = "cb436662-d82d-4f7e-bce5-6d4ce9ffa86c";
  const messages = [
    {
      message_id: SECOND_MESSAGE_ID,
      message_type: "text",
      next_message_ids: [],
      previous_message_ids: [{ message_id: FIRST_MESSAGE_ID, action: "*" }],
      is_root: false,
      payload: {
        nodeName: "x",
        context: [],
        text: "👋",
        workflow_column_id: "default_column",
        assigned_to: "0"
      }
    },
    {
      message_id: FIRST_MESSAGE_ID,
      message_type: "text",
      next_message_ids: [
        {
          message_id: SECOND_MESSAGE_ID,
          action: "",
          conditional: false,
          intent: { value: "" }
        }
      ],
      previous_message_ids: [],
      is_root: true,
      payload: {}
    }
  ];
  test("returns sorted array", () => {
    const [{ message_id }] = utils.topoSort(messages);
    expect(message_id).toBe(FIRST_MESSAGE_ID);
    expect(utils.topoSort(messages)).toHaveLength(messages.length);
  });
  test.todo("throws error in the case of project that contains cycles");
});
