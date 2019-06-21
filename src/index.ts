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
  next_message_ids: NextMessage[];
};

type IntentMap = Map<string, Intent[]>;

/**
 * Returns a map of message ids and any intents connected to them.
 *
 * @remarks
 * This function is importable as {import { createIntentMap } from "@botmock-api/utils"}.
 *
 * @param messages - Array of board messages
 * @param intents - Array of project intents
 * @returns IntentMap
 *
 * @beta
 */
export const createIntentMap = (
  messages: Message[] = [],
  intents: Intent[] = []
): IntentMap => {
  return new Map<string, Intent[]>(
    messages.reduce((acc, { next_message_ids }) => {
      return [
        ...acc,
        ...next_message_ids
          .filter(({ intent = { value: "" } }) => intent.value)
          .map(message => [
            message.message_id,
            [
              intents.find(({ id }) => id === message.intent.value),
              ...messages.reduce(
                (acc, { next_message_ids }) => [
                  ...acc,
                  ...next_message_ids
                    .filter(
                      ({ intent, message_id }) =>
                        intent.value &&
                        intent.value !== message.intent.value &&
                        message_id === message.message_id
                    )
                    .map(message =>
                      intents.find(({ id }) => id === message.intent.value)
                    )
                ],
                []
              )
            ]
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
 * @returns IntentMap
 *
 * @beta
 */
export const createMessageCollector = <A, B>(map: IntentMap, getMessage: any) =>
  function f(next: NextMessage[], collected: string[] = []) {
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
