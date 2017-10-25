var Issue = require('../issue');

module.exports = {
    name: 'attr-bans',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    var bannedAttrs = opts[this.name];

    if (!bannedAttrs || !element.attribs) {
        return [];
    }

    var issues = [];

    var attrs = element.attribs;
    bannedAttrs.forEach(function (name) {
        if (attrs.hasOwnProperty(name)) {
            issues.push(new Issue('E001',
                attrs[name].nameLineCol, { attribute: name }));
        }
    });

    return issues;
};
