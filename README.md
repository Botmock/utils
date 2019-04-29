# utils

```console
npm i @botmock-api/utils
```

utilities for handling data from the Botmock API

## API

```js
import * as utils from '@botmock-api/utils';
```

```js
utils.enumeratePaths({ messages: string[], connections: string[] }): Set<Array<string>>
```

Function that returns a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
which contains arrays with the message ids of each possible journey in the provided messages + connections

```js
utils.createIntentMap(messages: []): Map<messageId: string, intentIds: string[]>
```

Function that returns a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
which associates message ids with the list of intent ids connected to them

```js
utils.createNodeCollector(map: Map, get: (id: string) => ({}): (arr: string[]) => string[]
```

Creates function that turns `next_messages` into a collection of _all_ reachable
messages that are not connected by an intent
