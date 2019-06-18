"use strict";
exports.__esModule = true;
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
exports.createIntentMap = function (messages, intents) {
    if (messages === void 0) { messages = []; }
    if (intents === void 0) { intents = []; }
    return new Map(messages.reduce(function (acc, _a) {
        var next_message_ids = _a.next_message_ids;
        return acc.concat(next_message_ids
            .filter(function (_a) {
            var _b = _a.intent, intent = _b === void 0 ? { value: "" } : _b;
            return intent.value;
        })
            .map(function (message) { return [
            message.message_id,
            [
                intents.find(function (_a) {
                    var id = _a.id;
                    return id === message.intent.value;
                })
            ].concat(messages.reduce(function (acc, _a) {
                var next_message_ids = _a.next_message_ids;
                return acc.concat(next_message_ids
                    .filter(function (_a) {
                    var intent = _a.intent, message_id = _a.message_id;
                    return intent.value &&
                        intent.value !== message.intent.value &&
                        message_id === message.message_id;
                })
                    .map(function (message) {
                    return intents.find(function (_a) {
                        var id = _a.id;
                        return id === message.intent.value;
                    });
                }));
            }, []))
        ]; }));
    }, []));
};
