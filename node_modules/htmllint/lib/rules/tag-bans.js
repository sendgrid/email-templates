var Issue = require('../issue');

module.exports = {
    name: 'tag-bans',
    on: ['dom'],
    filter: ['tag', 'style', 'script']
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    if (!format || format.indexOf(element.name) < 0) {
        return [];
    }

    return new Issue('E016', element.openLineCol, {
        tag: element.name
    });
};
