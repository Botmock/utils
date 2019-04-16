# utils

```
npm i @botmock-api/utils
```

utilities for handling data from the Botmock API

### API

```
import * as utils from '@botmock-api/utils';
```

#### `utils.createIntentMap(messages: []): Map`

Function that returns a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
which associates message ids with the list of intent ids connected to them

#### `utils.getIntermediateNodes(map: Map, getMessage: (id: string) => ({})): () => string[]`

Function that takes an intent map (see above) and function that gets a message
from a board given an id, and returns a function that takes the `next_messages`
defined on a message, and exhaustive collects _all_ subsequent next messages
that do not emanate intents
