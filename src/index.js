/**
 * Really light weight templating. Designed to have a small
 * footprint and have the ability to precompile to a pure javascript
 * function if you so wish by calling toString() on the result of
 * calling compile();
 *
 * Syntax is relatively simple.  If you want to inline a value:
 *
 * ```
 *		var template = Template.compile("<+ data.value +> blah blah");
 *		var rendered = template({value: "zzzz..."});
 * ```
 *
 * Rendered will be: "zzzz... blah blah";
 *
 * If you want to use javascript control structures:
 *
 * ```
 *		var template = Template.compile("<| for (var x in data) { |> Hello <+x+> <| } |>");
 *		var rendered = template({ "Jane": "Person 1", "Bill": "Person 2"});
 * ```
 *
 * Rendered will be: "Hello Jane Hello Bill";
 *
 * Notice how the control structure must be syntactically correct Javascript
 * and notice how it must be enclosed within <| |> braces.
 *
 * MIT Licenced - Samuel Giles http://samgil.es
 */

function js(s) {
	return "b.push('" + s.replace(/'/g, "\\'").
		replace(/<\+/g, "');b.push(").
		replace(/\+>/g, ");b.push('").
		replace(/<\|/g, "');").
		replace(/\|>/g, "b.push('").
		replace(/\\/g, "\\\\").
		replace(/\n/gi, "") + "');";
}

module.exports.compile = function(s) {
	return new Function("data", "var b=[];" + js(s) + "return b.join('');");
};
