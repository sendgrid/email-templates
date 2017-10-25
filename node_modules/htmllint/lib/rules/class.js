var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'class',
    on: ['attr'],
    filter: ['class']
};

module.exports.lint = function (attr, opts) {
    var format = opts['class-style'] || opts['id-class-style'];
    var nodup = opts['class-no-dup'];
    if (!(format || nodup)) {
        return [];
    }

    var issues = [];
    var v = attr.value;

    var ignore = opts['id-class-ignore-regex'];
    var classes = [];
    // Parallel to classes; which classes are ignored
    var ignore_class = false;
    if (ignore) {
        var re = new RegExp('(' + ignore + ')|\\s*$|\\s+', 'g');
        var res;
        var start = 0;
        ignore_class = [false];
        while (start < v.length && (res = re.exec(v)) !== null) {
            if (res[1] === undefined) {
                classes.push(v.slice(start, res.index));
                start = re.lastIndex;
                ignore_class.push(false);
            } else {
                ignore_class[ignore_class.length - 1] = true;
            }
        }
        ignore_class.pop();
    } else {
        classes = v.split(/\s+/);
    }

    if (format) {
        var verify = knife.getFormatTest(format);

        classes.map(function(c, i) {
            if (!(ignore_class[i] || verify(c))) {
                issues.push(new Issue('E011', attr.valueLineCol,
                                      { format: format, 'class': c }));
            }
        });
    }

    if (nodup) {
        classes = classes.sort();
        for (var i = 0; i < classes.length - 1; i++) {
            if (classes[i + 1] === classes[i]) {
                issues.push(new Issue('E041', attr.valueLineCol,
                                      { classes: v }));
            }
        }
    }

    return issues;
};
