var _ = require('min-util')
var byteCode = require('bytecode')

var is = _.is

exports.encode = exports.btoa = encode
exports.decode = exports.atob = decode

var StdEncoding = getEncodingMap('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', '=')
var URLEncoding = getEncodingMap('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', '')

function decode(text, opt) {
	opt = opt || {}
	var encoding = StdEncoding
	if (opt.useURL) {
		encoding = URLEncoding
	} else if (null == opt.useURL && isURLBase64(text)) {
		encoding = URLEncoding
	}
	text = text
		.replace(/\s+$/, '')
		.replace(/=+$/, '')
		.replace(/[\n\r]/g, '') // skip empty line
	var buf = _.map(text.split(''), function(char) {
		return ~~encoding.decodeMap[char]
	})
	var arr = []
	for (var i = 0; i < buf.length; i += 4) {
		var bytes = arr3to4(_.slice(buf, i, i + 4))
		arr.push.apply(arr, bytes)
	}
	return byteCode.encode(arr)
}

function encode(binary, opt) {
	if (is.string(binary)) {
		binary = byteCode.decode(binary)
	}
	return encodeBinary(binary, opt)
}

function encodeBinary(binary, opt) {
	opt = opt || {}
	var encoding = StdEncoding
	if (opt.useURL) {
		encoding = URLEncoding
	}
	var arr = []
	for (var i = 0; i < binary.length; i += 3) {
		arr.push.apply(arr, arr4to3(_.slice(binary, i, i + 3)))
	}
	arr = _.map(arr, function(i) {
		return encoding.encodeMap[i] || encoding.padding
	})
	return arr.join('')
}

function arr4to3(arr) {
	// 4 * 6 => 3 * 8
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

function arr3to4(arr) {
	// 3 * 8 => 4 * 6
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

function getEncodingMap(str, padding) {
	var encodeMap = str2obj(str)
	var decodeMap = _.invert(encodeMap)
	return {
		encodeMap: encodeMap,
		decodeMap: decodeMap,
		padding: padding
	}
}

function str2obj(str) {
	var ret = {}
	for (var i = 0; i < str.length; i++) {
		ret[i] = str.charAt(i)
	}
	return ret
}

function isURLBase64(text) {
	return /[-_]/.test(text)
}
