# idyll-context-compose

Compose multiple contexts; makes it easier to work with multiple [Idyll runtime plugins](https://github.com/idyll-lang/idyll-plugins).

## Example


Say you want to use a runtime plugin like [url-state](idyll-plugin-url-state) but also add your own custom context processing code:


*context.js* 
```js
const URLState = require('idyll-plugin-url-state');
const compose = require('idyll-context-compose');

const customContext = (ctx) => {
  // To listen for changes:
  ctx.onUpdate((newData) => {
    console.log('[custom context]', newData);
  })
}

module.exports = compose(URLState, customContext);
```

## Installation

```
$ npm install --save -context-compose
```

### Adding a custom context file

To use this library, you'll need to tell Idyll to use a custom context. To do that, create a `context.js` file, and point Idyll to in in `package.json`:

```
"idyll": {
  "context": "./context.js"
}
```

