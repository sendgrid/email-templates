var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-name-style',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    var ignore = opts['attr-name-ignore-regex'];
    if (ignore !== false && (new RegExp(ignore)).test(attr.name)) { return []; }

    var verify = knife.getFormatTest(format);

    return verify(attr.name) ? [] :
        new Issue('E002', attr.nameLineCol, { format: format });
};
