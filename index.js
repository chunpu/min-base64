var _ = require('min-util')
var byteCode = require('bytecode')

var is = _.is
var tableStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var table = str2obj(tableStr)
var padChar = '='
var invertTable = _.invert(table)

exports.encode = exports.btoa = encode
exports.decode = exports.atob = decode

function str2obj(str) {
	var ret = {}
	for (var i = 0; i < str.length; i++) {
		ret[i] = str.charAt(i)
	}
	return ret
}

function encode(binary) {
	if (is.string(binary)) {
		binary = byteCode.decode(binary)
	}
	return encodeBinary(binary)
}

function decode(text) {
	text = text.replace(/\s+$/, '').replace(/=+$/, '')
	var buf = _.map(text.split(''), function(char) {
		return ~~invertTable[char]
	})
	var arr = []
	for (var i = 0; i < buf.length; i += 4) {
		var bytes = arr6to8(_.slice(buf, i, i + 4))
		arr.push.apply(arr, bytes)
	}
	return byteCode.encode(arr)
}

function encodeBinary(binary) {
	var arr = []
	for (var i = 0; i < binary.length; i += 3) {
		arr.push.apply(arr, arr8to6(_.slice(binary, i, i + 3)))
	}
	arr = _.map(arr, function(i) {
		return table[i] || padChar
	})
	return arr.join('')
}

function arr8to6(arr) {
	// 4 => 3
	// 从3到0，因为3可能有变化
	var ret = []

	if (null == arr[2]) {
		ret[3] = 64
	} else {
		ret[3] = arr[2] & 0x3f
	}

	if (null == arr[1]) {
		ret[2] = 64
	} else {
		ret[2] = ((arr[1] & 0x0f) << 2) | (arr[2] >> 6)
	}

	ret[1] = ((arr[0] & 0x03) << 4) | (arr[1] >> 4)
	ret[0] = arr[0] >> 2 // 肯定有 arr[0]
	return ret
}

function arr6to8(arr) {
	// 3 => 4
	var ret = []

	if (null != arr[3]) {
		ret[2] = ((arr[2] & 0x03) << 6) + arr[3]
	}
	if (null != arr[2]) {
		ret[1] = ((arr[1] & 0x0f) << 4) + ((arr[2] & 0x3c) >> 2)
	}
	if (null != arr[1]) {
		ret[0] = (arr[0] << 2) + ((arr[1] & 0x30) >> 4)
	}

	return ret
}
