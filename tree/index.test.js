const script = require('./index')

beforeEach(() => {
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
	// очищаем переменную рекурсивной функции перед вызовом
	script.showBranch.str = ''
});

test('showTree shows correct result for tree with different levels of node', () => {
	output = "1\n├──2\n|  └──3\n|  └──4\n└──5\n   └──6\n      └──7\n      └──8\n"

	const result = script.showTree(structObject)
	expect(result).toMatch(output);
})

describe('showBranch', () => {
	it("should show node with adding | for all tree if it's not last element", () => {
		outputBranch = "├──2\n|  └──3\n|  └──4\n"

		script.showBranch(structObject['items'][0], 1, false)
		expect(script.showBranch.str).toMatch(outputBranch);
	})
		
	it("shouldn't add | for all tree if it's last element", () => {
		outputBranch = "└──5\n   └──6\n      └──7\n      └──8\n"

		script.showBranch(structObject['items'][1], 1, true)
		expect(script.showBranch.str).toMatch(outputBranch);
	})
})

describe('showItemName', () => {
	it("should add | for node if it's not last element", () => {
		outputItem = "|  └──3"

		const result = script.showItemName(structObject['items'][0]['items'][0]['name'],2, false)
		expect(result).toMatch(outputItem);
	})

	it("shouldn't add | for node if it's last element", () => {
		outputItem = "   └──6"

		const result = script.showItemName(structObject['items'][1]['items'][0]['name'], 2, true)
		expect(result).toMatch(outputItem);
	})
})