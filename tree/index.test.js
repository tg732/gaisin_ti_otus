const script = require('./index')

structObject = {
	"name": 1,
	"items": [{
		"name": 2,
		"items": [{ "name": 3 }, { "name": 4 }]
	}, {
		"name": 5,
		"items": [{ 
			"name": 6,
			"items": [{ "name": 7 }, { "name": 8 }] 
		}]
	}]
}

output = `1
├──2
|  └──3
|  └──4
└──5
   └──6
      └──7
      └──8`

test('showTree', () => {
	const result = script.showTree(structObject)
	expect(result).toMatch(output);
})
