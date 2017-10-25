var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'img-req-alt',
    on: ['tag'],
    filter: ['img']
};

module.exports.lint = function (element, opts) {
    var opt = opts[this.name];
    if (!opt || knife.hasNonEmptyAttr(element, 'alt', opt === 'allownull')) {
        return [];
    }

    return new Issue('E013', element.openLineCol);
};
