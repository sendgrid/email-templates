var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'img-req-src',
    on: ['tag'],
    filter: ['img']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || knife.hasNonEmptyAttr(element, 'src')) {
        return [];
    }

    return new Issue('E014', element.openLineCol);
};
