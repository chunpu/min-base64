var _ = require('min-util')
var byteCode = require('bytecode')

exports.encode = exports.btoa = encode
exports.decode = exports.atob = decode

// btoa: b means binary, a means ascii
// btoa mdn https://html.spec.whatwg.org/multipage/#dom-windowbase64-btoa

var bit2char = getTable() // 000000 => 65('A')
var char2bit = _.mapObject(_.invert(bit2char), function(val) {
	return ~~val
}) // 65('A') => 000000
// http://www.cnblogs.com/chengxiaohui/articles/3951129.html

function encode(data) {
	// binary => ascii
	// https://tools.ietf.org/html/rfc4648
	var binary = byteCode.decode(data)
	var binary = _.map(binary, function(ch, i) {
		var ret = ch.toString(2)
		return _.padLeft(ret, 8, 0)
	})
	// binary.push('00000')
	binary = binary.join('')
	console.log(binary.length)
	var ascii = []
	var i = 0

	while (i < binary.length - 5) {
		ascii.push(binary.slice(i, i + 6))
		i += 6
	}

	ascii = _.map(ascii, function(item) {
		 var code = parseInt(item, 2) // 0 ~ 63
		 return String.fromCharCode(bit2char[code])
	}).join('')

	var len = ascii.length
	var remainder = len % 4
	if (remainder) {
		len = len + 4 - remainder
	}

	return _.padRight(ascii, len, '=')
}

console.log(encode('23'))

function decode(data) {
	// https://html.spec.whatwg.org/multipage/webappapis.html#dom-windowbase64-atob
	// 8.2
	// 3 remove all space char
	data = _.tostr(data).replace(/\s+/g, '').replace(/=+$/, '')
	var bytes = byteCode.decode(data)
	var ascii = _.map(bytes, function(ch) {
		var bit = char2bit[ch]
		if (null == bit) {
			throw new Error('out range')
		}
		return _.padLeft(bit.toString(2), 6, 0)
	})
	ascii.push('0000000')
	ascii = ascii.join('')
	var binary = []
	var i = 0

	while (i < ascii.length - 7) {
		binary.push(ascii.slice(i, i + 8))
		i += 8
	}

	binary = binary.map(function(ch) {
		return parseInt(ch, 2)
	})
	return byteCode.encode(binary)
}

/*
//console.log(decode('YQ=='))
var str = encode('中文12')
*/

function getTable() {
	// A~Za~z0~9+/
	var bytes = byteCode.decode('Aa0+/')
	var upper = _.range(26).map(function(i) {
		return bytes[0] + i
	})

	var lower = upper.map(function(code) {
		return code + bytes[1] - bytes[0]
	})

	var num = _.range(10).map(function(i) {
		return bytes[2] + i
	})
	
	return upper.concat(lower, num, bytes[3], bytes[4], '=')
}
