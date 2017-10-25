var Issue = require('../issue');

module.exports = {
    name: 'attr-no-dup',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || !element.dupes) {
        return [];
    }

    return element.dupes.map(function (n) {
        var a = element.attribs[n];

        return new Issue('E003', a.nameLineCol, { attribute: n });
    });
};
