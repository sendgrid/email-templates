var test = require('tape');
var bulk = require('../');

test('bound arguments', function (t) {
    t.plan(5);
   
    var res = bulk(__dirname + '/args', [
        [ '**/data.js', function (n) { return n * 111 } ],
        '**/*.js'
    ]);
    
    t.equal(res.beep, 'boop');
    t.equal(res.y.data.one(), 111);
    t.equal(res.y.data.two(), 222);
    t.equal(res.y.data.n(3), 333);
    t.equal(res.x.data(), 999);
});
