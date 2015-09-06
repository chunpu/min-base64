var _ = require('min-util')
var getBytes = require('getbytes')

exports.encode = exports.btoa = encode
exports.decode = exports.atob = decode

// btoa: b means binary, a means ascii
// btoa mdn https://html.spec.whatwg.org/multipage/#dom-windowbase64-btoa
// atob mdn https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob

var table = getTable()

function encode(data) {
	// binary => ascii
	var binary = getBytes(data)
	var binary = _.map(binary, function(ch, i) {
		var ret = ch.toString(2)
		return _.padLeft(ret, 8, '0')
	})
	binary.push('00000')
	binary = binary.join('')
	var ascii = []
	var i = 0

	while (i < binary.length - 5) {
		ascii.push(binary.slice(i, i + 6))
		i += 6
	}

	ascii = _.map(ascii, function(item) {
		 var code = parseInt(item, 2) // 0 ~ 63
		 return String.fromCharCode(table[code])
	}).join('')

	var len = ascii.length
	var num = len % 4
	if (num) {
		len = len + 4 - num
	}

	return _.padRight(ascii, len, '=')
}

function decode(data) {
}

function getTable() {
	// A~Za~z0~9+/
	var bytes = getBytes('Aa0+/')
	var upper = _.range(26).map(function(i) {
		return bytes[0] + i
	})

	var lower = upper.map(function(code) {
		return code + bytes[1] - bytes[0]
	})

	var num = _.range(10).map(function(i) {
		return bytes[2] + i
	})
	
	return upper.concat(lower, num, bytes[3], bytes[4])
}
