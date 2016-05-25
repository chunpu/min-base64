Api
---

- `btoa(str)`
- `btoa(binary array)`
- `btoa == encode`

- `atob(text)`
- `atob == decode`

```js
var base64 = require('min-base64')

base64.btoa('中文12') // => 5Lit5paHMTI=

base64.atob('5Lit5paHMTI=') // => 中文12

base64.btoa([97, 98, 99]), 'YWJj'
```

URL base64
---

standard base64 map

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`

url base64 map

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`

Detect `-` `_` to trigger url decode mode

```js
base64.encode('5YaF5ZywLOa4uOaIjyznnJ_kurrnp4As5Zyw5Yy6LOexu-WeiyzphY3pn7Por63np40s5Zu96K-tLOe7vOiJuuWoseS5kCznu7zoibrlqLHkuZAs5pyA5paw5pu05pawLOi3keeUt-Wboua5v-i6q-a_gOaImOilv-WPjOeJiOe6sw==', {useURL: true})

// => 内地,游戏,真人秀,地区,类型,配音语种,国语,综艺娱乐,综艺娱乐,最新更新,跑男团湿身激战西双版纳
```

Skip Empty Line
---

```js
base64.atob('5Lit\n5p\n\raH\rMTI=') // => 中文12
```
