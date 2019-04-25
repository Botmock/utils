export const enumeratePaths = digraph => {
  return new Set();
};

// Return a map associating message id and array of intent ids connected to it
export const createIntentMap = (messages = []) => {
  return new Map(
    messages.reduce(
      (acc, { next_message_ids }) => [
        ...acc,
        ...next_message_ids
          .filter(({ intent }) => intent.value)
          // Group this message with this intent and others like it (in that they
          // also are incident on this message)
          .map(message => [
            message.message_id,
            [
              message.intent.value,
              ...messages.reduce(
                (acc, { next_message_ids }) => [
                  ...acc,
                  // Must have an intent, must not be the one we already have,
                  // and must be incident on this message
                  ...next_message_ids
                    .filter(
                      ({ intent, message_id }) =>
                        intent.value &&
                        intent.value !== message.intent.value &&
                        message_id === message.message_id
                    )
                    .map(m => m.intent.value)
                ],
                []
              )
            ]
          ])
      ],
      []
    )
  );
};

// Return a function that collects reachable nodes that are not connected by
// intents
export const createNodeCollector = (map, getMessage) =>
  function f(next, collected = []) {
    for (const { message_id } of next) {
      // If the provided intent map does not have this message id, recur with
      // this id appended to `collected`
      if (!map.has(message_id)) {
        const { next_message_ids } = getMessage(message_id);
        return f(next_message_ids, [...collected, message_id]);
      }
    }
    return collected;
  };
