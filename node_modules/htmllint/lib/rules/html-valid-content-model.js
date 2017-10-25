var Issue = require('../issue');

module.exports = {
    name: 'html-valid-content-model',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (elt, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var output = [],
        has_head = false,
        has_body = false;

    elt.children.forEach(function (e) {
        if (e.type !== 'tag') {
            return;
        }
        // E044: Illegal element
        // E045: Duplicated tag
        // E046: Head and body tags out of order
        var err;
        if (e.name === 'head') {
            err = has_body ? 'E046' : has_head ? 'E045' : false;
            has_head = true;
        } else if (e.name === 'body') {
            err = has_body ? 'E045' : false;
            has_body = true;
        } else {
            err = 'E044';
        }
        if (err) {
            output.push(new Issue(err, e.openLineCol));
        }
    });

    return output;
};
