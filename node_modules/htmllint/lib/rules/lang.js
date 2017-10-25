var Issue = require('../issue'),
    knife = require('../knife');

module.exports = {
    name: 'lang',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (element, opts) {
    var a = element.attribs;
    if (a && a.hasOwnProperty('lang')) {
        var l = a.lang.value;
        if (opts['lang-style']) {
            var valid = knife.checkLangTag(l);
            if (valid === 1) {
                return new Issue('E038', a.lang.valueLineCol, {lang:l});
            }
            if (opts['lang-style'] === 'case' && valid === 2) {
                return new Issue('E039', a.lang.valueLineCol, {lang:l});
            }
        }
        return [];
    }

    return opts['html-req-lang'] ?
        new Issue('E025', element.openLineCol) : [];
};
