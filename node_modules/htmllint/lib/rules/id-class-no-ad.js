var Issue = require('../issue');

module.exports = {
    name: 'id-class-no-ad',
    on: ['attr'],
    filter: ['id', 'class']
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var match = /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.exec(attr.value);
    if (!match) {
        return [];
    }

    return new Issue('E010', attr.valueLineCol);
};
