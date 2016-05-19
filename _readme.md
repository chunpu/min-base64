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
