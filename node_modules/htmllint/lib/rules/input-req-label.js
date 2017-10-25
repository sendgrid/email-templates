var Issue = require('../issue');

module.exports = {
    name: 'input-req-label',
    labels: {},
    inputsInfo: [],
    on: ['tag'],
    filter: ['input', 'label']
};

module.exports.end = function () {
    var issues = [];
    if (this.inputsInfo.length > 0) {
        this.inputsInfo.forEach(function (input) {
            if (!this.labels[input.id] && !this.labels[input.name]) {
                issues.push(new Issue('E033', input.location, {
                    'idValue': input.id,
                    'nameValue': input.name
                }));
            }
        }.bind(this));
    }

    // wipe previous table
    this.labels = {};
    this.inputsInfo = [];

    return issues;
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // if it's a label with a 'for', store that value
    if (element.name === 'label') {
        if (element.attribs.hasOwnProperty('for')) {
            this.labels[element.attribs.for.value] = element;
        }
        return [];
    }

    // if it's not a text-type input, ignore it
    if (!(element.attribs.hasOwnProperty('type')) || !(element.attribs.type.value === 'text' || element.attribs.type.value === 'radio')) {
        return [];
    }
    var type = element.attribs.type.value;

    // check if the input has a label as a parent.
    var parent = element.parent;
    while (parent !== null) {
        if (parent.name === 'label') {
            return [];
        }
        parent = parent.parent;
    }

    // check if the input has a named label, by storing the values to check at the end.
    var id = (element.attribs.hasOwnProperty('id') && element.attribs.id) ? element.attribs.id.value : null;
    var name = (element.attribs.hasOwnProperty('name') && element.attribs.name && (type === 'text')) ? element.attribs.name.value : null;
    if (id || name) {
        this.inputsInfo.push({
            'id': id,
            'name': name,
            'location': element.openLineCol
        });
    } else {
        return new Issue('E033', element.openLineCol, {
            'idValue': 'null',
            'nameValue': 'null'
        });
    }

    return [];
};