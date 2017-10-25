var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-req-value',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var v = attr.rawEqValue;
    if (v ? /^[^'"]+=/.test(v) : !knife.isBooleanAttr(attr.name)) {
        return new Issue('E006', attr.valueLineCol);
    }

    return [];
};
