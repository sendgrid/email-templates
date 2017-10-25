var Issue = require('../issue');

module.exports = {
    name: 'head-valid-content-model',
    on: ['tag'],
    filter: ['head']
};

module.exports.lint = function (elt, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var legal_children = ['base', 'link', 'meta', 'noscript', 'script', 'style', 'template', 'title'];

    return elt.children.filter(function (e) {
        return e.type === 'tag' && legal_children.indexOf(e.name) < 0;
    }).map(function(e) {
        return new Issue('E047', e.openLineCol);
    });
};
