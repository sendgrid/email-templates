var Issue = require('../issue');

module.exports = {
    name: 'page-title',
    on: ['tag'],
    filter: ['head']
};

module.exports.lint = function (elt, opts) {
    var output = [];
    var titles = elt.children.filter(function (e) {
        return e.type === 'tag' && e.name === 'title';
    });
    if (opts['head-req-title'] &&
            !titles.some(function(t){return t.children.length > 0;})) {
        output.push(new Issue('E027', elt.openLineCol));
    }
    if (opts['title-no-dup'] && titles.length > 1) {
        output.push(new Issue('E028', titles[1].openLineCol,
            { num: titles.length }));
    }

    var maxlen = opts['title-max-len'];
    if (maxlen) { titles.map(function(t) {
        var text = t.children.filter(function(c) {return c.type === 'text';})
            .map(function(c) { return c.data; }).join('');
        if (text.length > maxlen) {
            output.push(new Issue('E029', t.openLineCol,
                { title: text, maxlength: maxlen }));
        }
    }); }

    return output;
};
