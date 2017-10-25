var Issue = require('../issue');

module.exports = {
    name: 'href-style',
    on: ['tag'],
    filter: ['a']
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    // Should return an issue, since a without href is bad
    if (!element.attribs || !element.attribs.hasOwnProperty('href')) {
        return [];
    }

    // Link must be absolute iff specified format is absolute
    return ((format === 'absolute') ===
        (element.attribs.href.value.search('://') !== -1)) ? [] :
        new Issue('E009', element.openLineCol, { format: format });
};
