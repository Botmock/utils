// Return a set representing all possible "journeys" in the project as arrays
export const enumeratePaths = (messages = []) => {
  const root = messages.find(m => !!m.is_root);
  if (typeof root === 'undefined') {
    throw new Error('messages must include a root message');
  }
  const s = new Set();
  // Recurse on next_message_ids, beginning with root
  (function f(nextIds) {
    for (const { message_id } of nextIds) {
      // Add the union of the last element in the set and the current message
      // id to the set
      const lastSetElement = Array.from(s).pop() || [];
      const message = messages.find(m => m.message_id === message_id);
      s.add([
        ...(typeof lastSetElement === 'string'
          ? [lastSetElement]
          : lastSetElement),
        message.message_id
      ]);
      f(message.next_message_ids);
    }
  })(root.next_message_ids);
  return s;
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

// Return a function that collects reachable nodes not connected by intents
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
