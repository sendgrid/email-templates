var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-quote-style',
    on: ['attr']
};

// only need to match the beginning of the raw value
var formats = {
    'double': /^"/,
    'single': /^'/,
    'quoted': /^['"]/
};

var formatNames = {
    'double': 'double quoted',
    'single': 'single quoted',
    'quoted': 'quoted'
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var format = formats[opts[this.name]] || formats.quoted,
        issues = [];

    var v = attr.rawValue;
    if (v && !format.test(v)) {
        var msgData = {
            attribute: attr.name,
            format: formatNames[opts[this.name]] || formatNames.quoted
        };
        return new Issue('E005', attr.valueLineCol, msgData);
    }

    return [];
};
