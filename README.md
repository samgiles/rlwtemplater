# Really Lightweight Templating

Yes, yet another small templating library for Javascript. The age old problem
that has been solved coutless times. Why another?  So I could practice getting
used to node and javascript again, and additionally, try out mocha for the first
time.

On top of this, I wanted a really lightweight templating library that I didn't
have to learn for a larger side project, weighing in at 10 lines of
code makes this ideal.  Additionally, for offline, mobile web applications,
small amounts of code are effective for network transfer and storage reasons.

## Get Started

### Installation

`npm(1)` installation:

```
npm install git@github.com:samgiles/rlwtemplater.git
```

### Usage

Simple concatenation.  The `data` object contains the values used in the
template and is the value passed into the function created by `compile`.

```JS
var compile = require("rlwtemplater");

var render = compile("Hello <+ data.noun +>");

log(render({noun: "World"}));  // 'Hello World'
log(render({noun: "Plant"}));  // 'Hello Plant'

```

Control structures, looping etc.  Notice how javascript can be used by
enclosing it within `<| |>` braces. Using `<+ +>` you can concatenate data
inline with the rest of the string data.

```JS
var compile = require("rlwtemplater");

var render = compile(
		"Hello<| for (var i = 0; i < data.people.length - 1; i++) { |>" +
		" <+ data.people[i] +>," +
		"<| } |> and <+ data.people[data.people.length - 1] +>.");

log(render({people: ["A", "B", "C"]})); // Hello A, B, and C.
```

### Server Side Rendering

Why not pre-compile your templates _before_ sending them to the client? You
don't need to ship the templating library or the templates to the browser
in this case.  Since the `compile` function creates a function, the `toString`
method can be called on it returning a string representation of the function
which can then be sent to the client or incorporated into the build process.

## Security Caveats

As with any user input, be wary of user input directly within the
templates. Don't pass user input to the `compile` function and consider XSS
vulnerabilities when passing data into the compiled `render` function.

## License

MIT
