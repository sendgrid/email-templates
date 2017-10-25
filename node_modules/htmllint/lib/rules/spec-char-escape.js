var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'spec-char-escape',
    on: ['dom'],
    filter: ['text', 'tag']
};

var regex = {
    improper: /(&[^a-zA-Z0-9#;]*;)/gm, // checks for properly formed escapes with improper characters inside them
    brackets: /[<>]/gm, // checks for > and <
    unescaped: /(&[a-zA-Z0-9#]*[^a-zA-Z0-9#;])/gm // checks for not forming an escape sequence properly
};

function executeRegex(regexLine, text) {
    return regexLine.exec(text) || false;
}

module.exports.lint = function (element, opts) {
    // if not enabled, get outta here!
    if (!opts[this.name]) {
        return [];
    }

    var issues = [],
        lineColFunc = null;

    // if it's text - make sure it only has alphanumericals. If it has a &, a ; should follow.
    if (['text'].indexOf(element.type) > -1 && element.data.length > 0) {
        lineColFunc = knife.getLineColFunc(element.data, element.openLineCol);
        [regex.improper, regex.brackets, regex.unescaped].forEach(function (currentRegex) {
            var match = executeRegex(currentRegex, element.data);
            while (match) {
                var lineCol = lineColFunc(match.index);
                issues.push(new Issue('E023', lineCol, {
                    chars: match[1],
                    part: 'text'
                }));
                match = executeRegex(currentRegex, element.data);
            }
        });
    }

    if (element.attribs) {
        var attributeNames = Object.keys(element.attribs);

        for (var index = 0; index < attributeNames.length; index++) {
            var valueObject = element.attribs[attributeNames[index]];
            lineColFunc = knife.getLineColFunc(valueObject.value, valueObject.valueLineCol);
            [regex.improper, regex.brackets, regex.unescaped].forEach(function (currentRegex) {
                var match = executeRegex(currentRegex, valueObject.value);
                while (match) {
                    var lineCol = lineColFunc(match.index);
                    issues.push(new Issue('E023', lineCol, {
                        chars: match[1],
                        part: 'attribute value'
                    }));
                    match = executeRegex(currentRegex, element.data);
                }
            });
        }
    }
    return issues;
};
