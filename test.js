var assert = require('assert')
var base64 = require('./')

describe('btoa', function() {
	it('encode empty', function() {
		assert.deepEqual(base64.btoa(''), '')
	})

	it('encode simple string', function() {
		// echo -n a | base64
		assert.deepEqual(base64.btoa('a'), 'YQ==')

		// echo -n abc | base64
		assert.deepEqual(base64.btoa('abc'), 'YWJj')
	})

	it('encode other unicode', function() {
		// echo -n 中文12 | base64
		assert.deepEqual(base64.btoa('中文12'), '5Lit5paHMTI=')
	})
})
