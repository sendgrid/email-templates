var Issue = require('../issue');
var regUnsafe = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;

module.exports = {
    name: 'attr-no-unsafe-char',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    return regUnsafe.test(attr.value) ? new Issue('E004', attr.valueLineCol) : [];
};
