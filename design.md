base64

btoa = binary to ASCII = encode

atob = ASCII to binary = decode

base64 使用 64 个 ASCII 字符

`[A-Za-z0-9+/] = 26 + 26 + 10 + 2 = 64`

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`

注意这64位是按顺序的，就是说 0 = 00000000 = A, 63 = 11111111 = /

这个 `+` 和 `/` 特别坑爹，因为它们在 url 中属于特殊字符，如果当初设计成 `-` 和 `_` 就好了

任何数据都能被 base64，因为 base64 接受的参数是 binary，任何数据都是 binary，比如 img, mp3, gzip 等

base64 最大的好处是二进制文件本来是完全不可读而且不可显示的，转成 base64 就成了文本，不仅可读可编辑，而且传输数据也方便

base64是可逆的，在只可以传递纯文本的时候，通过 base64 我们就可以传递一切了

不过正因为如此，base64 肯定是不能用来加密的，因此 base64 的 encode 和 decode 应该称为编码和解码，而不能称为加密和解密

虽然不能用来加密，但可以用来混淆，比如百度贴吧的种子链接，你懂的

base64 中还会出现 `=`，是用来补齐的

为什么用64位呢？我们知道64是2的6次方，一连串二进制被6位6位的等分

那为什么不是5位等分或者7位等分呢？

原因很简单，7位等分就需要128个字符，找不到这么多现成的字符，而5位等分只需要32个字符，连大小写字符都没用完，太浪费了

6等分造成的一个后果就是 base64 后的文本大小始终是大于等于源数据的 8/6，也就是**至少比源文件大 1/3**，那也肯定比源数据大的，因为虽然6等分了，但一个字符还是8bit。但要注意的是 gzip 后这个大小差距会减少

### base64 的补齐

base64 按6位分，而 byte 是8位二进制，最小公倍数是24

因此一个二进制转成二进制后，还要把位数补齐成24的倍数

### 一次加密事例

1. 源文件是字符串 `"abc"`
1. 先转成二进制 `[97, 98, 99]`
1. 对应的二进制就是 `[01100001, 01100010, 01100011]`，取法 `'a'.charCodeAt(0).toString(2)`
1. 正好24位不用补齐
1. 重新按6位分割成新的数组 `[011000, 010110, 001001, 100011]`
1. 对应十进制就是 `[24, 22, 9, 35]`
1. 映射到 base64 表中就是 `['Y', 'W', 'J', 'j']`，也就是 `YWJj`

但真的要把字符串拼出来然后再 split 吗？

我们必须用男人的方式来解决此问题，没错就是二进制！

1. 011000 = **011000**01, 右移两位就是, 也就是 `97 >> 2 = 24`
1. 010110 = 011000**01**, **0110**0010，`((97 & 0x03) << 4) | (98 >> 4) = 22`
1. 001001 = 0110**0010**, **01**100011，`((98 & 0x0f) << 2) | (99 >> 6) = 9`
1. 100011 = 01**100011**，`99 & 0x3f = 35`


url safe base64

https://docs.python.org/3/library/base64.html#base64.urlsafe%5Fb64encode

Encode bytes-like object s using the URL- and filesystem-safe alphabet, which substitutes - instead of + and _ instead of / in the standard Base64 alphabet, and return the encoded bytes. The result can still contain =

https://en.wikipedia.org/wiki/Base64#URL_applications

`+` 始终代替 `-`

没有 = 这个 paddding

是否要忽略非 ascii 字符 作为参数
