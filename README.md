# utils

> this package is unstable and likely to undergo major API changes

This module exposes utilities for handling data from the [Botmock API](https://docs.botmock.com/#introduction).

It uses TypeScript and is installable by running:

```shell
npm i @botmock-api/utils@latest
```

## API

All of the following functions are accessible via `import * as utils from "@botmock-api/utils"`.

### `utils.createIntentMap(messages: Message[], intents: Intent[]): IntentMap`

Returns a map of message ids and any intents connected to them.

### `utils.createMessageCollector(map: IntentMap, getMessage: (id: string) => Message): () => string[]`

Returns a function that collects all messages not connected by an intent.

### `utils.topoSort(messages: Message[]): Message[]`

Creates linear order of messages such that if (m1, m2) is a connection in the board, m1 appears before m2 in the linear order.
