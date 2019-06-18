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
