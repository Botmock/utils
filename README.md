# utils

```
npm i @botmock-api/utils
```

utilities for handling data from the Botmock API

## API

```
import * as utils from '@botmock-api/utils';
```

- `utils.createIntentMap(messages: []): Map`

- `utils.getIntermediateNodes(map: Map, getMessage: () => ({})): () => Array<string>`
