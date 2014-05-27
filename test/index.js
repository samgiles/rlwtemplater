var assert = require("assert");
var compile = require("../");

describe('Template', function() {
	describe('#compile()', function() {

		it('should concatenate <+ +> statements', function() {
			var template = 'Hello <+ data.person +>, today is <+ data.dayname +>.';
			var render = compile(template);
			var rendered = render({ person: "Person", dayname: "Thursday"});
			assert.equal("Hello Person, today is Thursday.", rendered);
		});

		it('should escape strings containing "\'" characters', function() {
			var template = "It's cold outside today (<+ data.temp +> degrees).";
			var render = compile(template);
			var rendered = render({temp: -10});
			assert.equal("It's cold outside today (-10 degrees).", rendered);
		});

		it('should preserve new lines in rendered output', function() {
			var template = "There\nare\nnewlines\nhere";
			var render = compile(template);
			var rendered = render({});
			assert.equal("There\nare\nnewlines\nhere", rendered);
		});

		it('should handle js control statements', function() {
			var template = '<| for (var index = 0; index < data.people.length; index++) { |> Hello <+ data.people[index] +>! <| } |>';
			var render = compile(template);
			var rendered = render({ people: ["Jane", "John"]});
			assert.equal(" Hello Jane!  Hello John! ", rendered);
		});
	});
});
