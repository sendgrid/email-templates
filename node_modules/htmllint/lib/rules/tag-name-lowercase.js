var Issue = require('../issue');

module.exports = {
    name: 'tag-name-lowercase',
    on: ['tag']
};

var uppercaseMask = (/[A-Z]/);

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || !uppercaseMask.test(element.name)) {
        return [];
    }

    return new Issue('E017', element.openLineCol);
};
