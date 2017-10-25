var Issue = require('../issue');

module.exports = {
    name: 'attr-order',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    var order = opts[this.name];
    if (!order) {
        return [];
    }

    var attrs = element.attribs,
        lastpos = 0,
        lastname,
        issues = [];
    order.forEach(function(name) {
        if (!attrs.hasOwnProperty(name)) return;
        var a = attrs[name];
        var pos = a.nameIndex;
        if (pos > lastpos) {
            lastpos = pos;
            lastname = name;
        } else {
            issues.push(new Issue('E043', a.nameLineCol,
                { attribute: name, previous: lastname }));
        }
    });

    return issues;
};
