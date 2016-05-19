var base64 = require('../')

global.base64 = base64

var encoded = base64.btoa('中文12')

log('5Lit5paHMTI=' == encoded)
// log(encoded)

var decoded = base64.atob('5Lit5paHMTI==== ')

log('中文12' == decoded)
// log(decoded)

function log(val) {
	if (global.console) {
		console.log(val)
	} else {
		alert(val)
	}
}
