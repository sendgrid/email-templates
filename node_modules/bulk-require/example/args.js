var level = require('level');
var db = level('/tmp/test.db');
var bulk = require('../');

var sections = bulk(__dirname + '/data', [
    [ '**/data.js', db ],
    '**/*.js'
]);
sections.owners.data.one('mr-jenkins', console.log);
