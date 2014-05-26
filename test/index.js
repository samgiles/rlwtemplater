var assert = require("assert");
var Template = require("../");

describe('Template', function() {
	describe('#compile()', function() {

		it('should concatenate <+ +> statements', function() {
			var template = 'Hello <+ data.person +>, today is <+ data.dayname +>.';
			debugger;
			var render = Template.compile(template);
			var rendered = render({ person: "Person", dayname: "Thursday"});
			assert.equal("Hello Person, today is Thursday.", rendered);
		});

	});
});
