# utils

This module exposes utilities for handling data from the [Botmock API](https://docs.botmock.com/#introduction).

It uses TypeScript and is installable by running:

```shell
npm i @botmock-api/utils
```

## API

`createIntentMap(messages: Message[], intents: Intent[]): IntentMap`

Returns a map of message ids and any intents connected to them.
