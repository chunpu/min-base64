var assert = require('assert')
var base64 = require('./')

describe('btoa encode', function() {
	it('encode empty', function() {
		assert.deepEqual(base64.btoa(''), '')
	})

	it('encode simple string', function() {
		// echo -n a | base64
		assert.deepEqual(base64.btoa('a'), 'YQ==')

		// echo -n abc | base64
		assert.deepEqual(base64.btoa('abc'), 'YWJj')
	})

	it('encode binary array', function() {
		// abc => [97, 98, 99]
		assert.deepEqual(base64.btoa([97, 98, 99]), 'YWJj')
	})

	it('encode other unicode', function() {
		// echo -n 中文12 | base64
		assert.deepEqual(base64.btoa('中文12'), '5Lit5paHMTI=')
	})
})

describe('atob decode', function() {
	it('decode other unicode', function() {
		assert.deepEqual(base64.atob('5Lit5paHMTI='), '中文12')
	})

	it('decode other unicode', function() {
		assert.deepEqual(base64.atob('5Lit5paHMTI==== '), '中文12')
	})
})

describe('other', function() {
	var txt = '内地,游戏,真人秀,地区,类型,配音语种,国语,综艺娱乐,综艺娱乐,最新更新,跑男团湿身激战西双版纳'
	var a = base64.btoa(txt)
	var b = base64.atob(a)
	assert.deepEqual(b, txt)
})
