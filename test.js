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
	it('support long str', function() {
		var txt = '内地,游戏,真人秀,地区,类型,配音语种,国语,综艺娱乐,综艺娱乐,最新更新,跑男团湿身激战西双版纳'
		var expectedB64 = '5YaF5ZywLOa4uOaIjyznnJ/kurrnp4As5Zyw5Yy6LOexu+WeiyzphY3pn7Por63np40s5Zu96K+tLOe7vOiJuuWoseS5kCznu7zoibrlqLHkuZAs5pyA5paw5pu05pawLOi3keeUt+Wboua5v+i6q+a/gOaImOilv+WPjOeJiOe6sw=='
		var b64 = base64.btoa(txt)
		assert.deepEqual(b64, expectedB64)
		var retTxt = base64.atob(b64)
		assert.deepEqual(retTxt, txt)

		var URLB64 = b64.replace(/\+/g, '-').replace(/\//g, '_')
		assert.deepEqual(URLB64, '5YaF5ZywLOa4uOaIjyznnJ_kurrnp4As5Zyw5Yy6LOexu-WeiyzphY3pn7Por63np40s5Zu96K-tLOe7vOiJuuWoseS5kCznu7zoibrlqLHkuZAs5pyA5paw5pu05pawLOi3keeUt-Wboua5v-i6q-a_gOaImOilv-WPjOeJiOe6sw==')
		var retURLTxt = base64.atob(URLB64, {useURL: true})
		assert.deepEqual(retURLTxt, txt)
	})

	it('support skip empty line \\n \\r', function() {
		assert.deepEqual(base64.atob('5Lit\n5p\n\raH\rMTI='), '中文12')
	})
})
