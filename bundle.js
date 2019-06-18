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
export const createIntentMap = (messages = [], intents = []) => {
  return new Map(messages.reduce((acc, {
    next_message_ids
  }) => [...acc, ...next_message_ids.filter(({
    intent
  }) => intent.value).map(message => [message.message_id, [intents.find(({
    id
  }) => id === message.intent.value), ...messages.reduce((acc, {
    next_message_ids
  }) => [...acc, ...next_message_ids.filter(({
    intent,
    message_id
  }) => intent.value && intent.value !== message.intent.value && message_id === message.message_id).map(message => intents.find(({
    id
  }) => id === message.intent.value))], [])]])], []));
};
