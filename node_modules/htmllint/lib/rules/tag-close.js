var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'tag-close',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    // If the tag did not close itself
    if (!element.close ||
        element.name.toLowerCase() !== element.close.toLowerCase()) {
        if (knife.isVoidElement(element.name)) {
            var selfClose = knife.isSelfClosing(element);
            var style = opts['tag-self-close'];
            if ((style == 'always' && !selfClose) ||
                (style == 'never' && selfClose)) {
                return new Issue('E018', element.openLineCol,
                                 {expect: style});
            }
        } else {
            if (opts['tag-close']) {
                return new Issue('E042', element.openLineCol);
            }
        }
    } else {
        if (opts['tag-name-match'] && element.name !== element.close) {
            return new Issue('E030', element.closeLineCol);
        }
    }

    return [];
};
