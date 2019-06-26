type Utterance = {
  text: string;
  variables: any[];
};

type Intent = {
  id: string;
  name: string;
  utterances: Utterance[];
};

type NextMessage = {
  message_id: string;
  action: any;
  conditional: boolean;
  intent: { value: string };
};

type Message = {
  message_id: string;
  message_type: string;
  next_message_ids: NextMessage[];
  is_root: boolean;
  payload: {
    nodeName: string;
    context: any[];
    text: string;
    workflow_column_id: string;
    assigned_to: string;
  };
  previous_message_ids: { message_id: string; action: string | {} }[];
};

type IntentMap = Map<string, string[]>;

/**
 * Returns a map of message ids and any intents connected to them.
 *
 * @remarks
 * This function is importable as {import { createIntentMap } from "@botmock-api/utils"}.
 *
 * @param messages - Array of board messages
 * @param intents - Array of project intents
 * @returns IntentMap
 */
export const createIntentMap = (
  messages: Message[] = [],
  intents: Intent[] = []
): IntentMap => {
  return new Map<string, string[]>(
    messages.reduce((acc, { next_message_ids }) => {
      return [
        ...acc,
        ...next_message_ids
          .filter(({ intent = { value: "" } }) => intent.value)
          // map next messages to (id, incident intent id array) pairs
          .map(message => [
            message.message_id,
            [
              intents.find(intent => {
                return intent.id === message.intent.value;
              }),
              // spread across the intent on any next message ids connected
              // to this message
              ...messages.reduce((acc, { next_message_ids }) => {
                return [
                  ...acc,
                  ...next_message_ids
                    .filter(({ intent, message_id }) => {
                      return (
                        intent.value &&
                        intent.value !== message.intent.value &&
                        message_id === message.message_id
                      );
                    })
                    .map(message => {
                      return intents.find(
                        ({ id }) => id === message.intent.value
                      );
                    })
                ];
              }, [])
            ].map(intent => intent.id)
          ])
      ];
    }, [])
  );
};

/**
 * Returns a function that collects all messages not connected by an intent.
 *
 * @remarks
 * This function is importable as {import { createMessageCollector } from "@botmock-api/utils"}.
 *
 * @param map - Map relating message ids and array of intents connected to them
 * @param getMessage - Function that takes message id and returns message from board
 * @returns MessageCollector
 *
 * @beta
 */
export const createMessageCollector = (map: IntentMap, getMessage: any) =>
  function f(next: NextMessage[], collected: string[] = []): string[] {
    let localCollected = collected;
    // iterate over all next messages; if message not found in intent map,
    // explore this message's next messages
    for (const { message_id } of next) {
      if (!map.has(message_id)) {
        const { next_message_ids } = getMessage(message_id);
        localCollected = f(next_message_ids, [...collected, message_id]);
      }
    }
    return localCollected;
  };

/**
 * Creates linear order of messages such that if (m1, m2) is a connection in the
 * board, m1 appears before m2 in the linear order.
 *
 * @remarks
 * This function is importable as {import { topoSort } from "@botmock-api/utils"}.
 *
 * @param messages - Array of messages in the board.
 * @returns Message[]
 *
 * @beta
 */
// export const topoSort = (messages: Message[]) => {};
