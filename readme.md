min-base64
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]
[npm-image]: https://img.shields.io/npm/v/min-base64.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-base64
[downloads-image]: http://img.shields.io/npm/dm/min-base64.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-base64
[david-image]: http://img.shields.io/david/chunpu/min-base64.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/min-base64


simple base64 of pure javascript, btoa and atob support unicode, support node and all browsers even IE6

Installation
---

```sh
npm i min-base64
```

Api
---

- `btoa(str)`
- `btoa(binary array)`
- `btoa == encode`

- `atob(text)`
- `atob == decode`

```javascript
var base64 = require('min-base64')

base64.btoa('中文12') // => 5Lit5paHMTI=

base64.atob('5Lit5paHMTI=') // => 中文12

base64.btoa([97, 98, 99]), 'YWJj'
```

License
---

[![License][license-image]][license-url]

[license-image]: http://img.shields.io/npm/l/min-base64.svg?style=flat-square
[license-url]: #
