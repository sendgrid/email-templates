var Issue = require('../issue');

module.exports = {
    name: 'doctype-html5',
    on: ['dom']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name] || ele.type !== 'directive') {
        return [];
    }

    // NOTE: this does not support legacy strings or obsolete permitted doctypes

    var doctype = /^!DOCTYPE[ \t\n\f]+html[ \t\n\f]*$/i;
    var name = /!doctype/i;
    if (name.test(ele.name)) {
        if (ele.data && doctype.test(ele.data)) {
            return [];
        } else {
            return new Issue('E008', ele.lineCol);
        }
    } else {
        return [];
    }
};
