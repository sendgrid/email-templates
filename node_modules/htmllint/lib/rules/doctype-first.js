var Issue = require('../issue');

module.exports = {
    name: 'doctype-first',
    on: ['dom'],
    passedFirst: false
};

module.exports.end = function () {
    this.passedFirst = false;
};

module.exports.lint = function (element, opts) {
    var option = opts[this.name];

    if (!option || this.passedFirst ||
        element.type === 'comment' || isWhitespace(element)) {
        return [];
    }
    this.passedFirst = true;

    if (element.type === 'directive' &&
        element.name.toUpperCase() === '!DOCTYPE') {
        return [];
    }

    // If the option is 'smart', fail only if a head tag is present.
    if (option === 'smart' &&
        !(element.type === 'tag' &&
          element.name.toLowerCase() === 'head')) {
        return [];
    }

    return new Issue('E007', element.openLineCol);
};

function isWhitespace(element) {
    return element.type === 'text' && /^[ \t\n\f\r]*$/.test(element.data);
};
