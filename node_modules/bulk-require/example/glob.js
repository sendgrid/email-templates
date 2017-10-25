var bulk = require('../');
var sections = bulk(__dirname, [ 'data/**/*.js', 'render/*.js' ]);
console.log(sections);
