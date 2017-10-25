# bulk-require

require a whole directory of trees in bulk

[![build status](https://secure.travis-ci.org/substack/bulk-require.png)](http://travis-ci.org/substack/bulk-require)

# example

``` js
var bulk = require('bulk-require');
var sections = bulk(__dirname, [ 'data/**/*.js', 'render/*.js' ]);
console.log(sections);
```

Running this `glob.js` file in a directory with these contents:

```
data/
  cats/
    index.js
    meow/
      x.js
  dogs/
    index.js
    small/
      yip.js
    wolf/
      doge.js
  owners/
    data.js
glob.js
render/
  xyz/
    ignored.js
  x.js
```

Gives this output:

```
{ data: 
   { cats: { [Function] index: [Circular], meow: [Object] },
     dogs: { [Function] index: [Circular], small: [Object], wolf: [Object] },
     owners: { data: [Object] } },
  render: { x: { oneoneone: 111, twotwotwo: 222 } } }
```

## bound arguments

You can also bind arguments by passing in an array instead of a glob string.

For example, if all `**/data.js` files have exports that take a `db` argument,
you can bind the arguments in bulk:

data/owners/data.js:

``` js
exports.all = function (db) {
    return db.createReadStream({ start: 'owner!', end: 'owner!\uffff' });
};

exports.one = function (db, name, cb) {
    db.get('owner!' + name, cb);
};
```

In this instance `data.js` has multiple individual exports but argument binding
also works if you export a single function with `module.exports=` assignment.

Now you can just call `sections.owners.data.one()` without supplying the `db`:

``` js
var level = require('level');
var db = level('/tmp/test.db');
var bulk = require('bulk-require');

var sections = bulk(__dirname + '/data', [
    [ '**/data.js', db ],
    '**/*.js'
]);
sections.owners.data.one('mr-jenkins', console.log);
```

```
null '{"cats":5,"dogs":3}'
```

# warning

For applications full of real-world trade-offs and messy business logic
organized into `model/` and `view/` directories  this approach to loading
modules may be justified, but most of the time you should just use the regular
kind of require.

What you should absolutely never do is run this module from somewhere deep in
your codebase. It should be very close to the entry point of your application.

Sometimes it's OK to break the rules. Especially if you can get away with it.
Caveat npmtor.

# methods

``` js
var bulk = require('bulk-require')
```

## var modules = bulk(basedir, globs, opts={})

Return a nested object `modules` by expanding the string or array of strings
`globs` rooted at the directory `basedir`.

Each file will be placed into the nested tree `modules` based on its filename
with respect to `basedir`. Each directory becomes a new nested object.

For each item in the `globs` array, if the item itself is an array, the glob
string will be treated as the first argument and the extra arguments will be
bound to all the top-level function exports for files matching the glob pattern.

If there is an `index.js` module that exports a single function with
`module.exports=`, all the sub-modules will be attached to the index reference
and it will serve as the parent node at that tree level. 

You can optionally pass in a custom `require` function with `opts.require`.

# install

With [npm](https://npmjs.org) do:

```
npm install bulk-require
```

# license

MIT
