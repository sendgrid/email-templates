var Issue = require('../issue');

module.exports = {
    name: 'indent-style',
    on: ['line']
};

module.exports.end = function () {
    delete this.current;
};

module.exports.lint = function (line, opts) {
    // The indent, that is, the whitespace characters before the first
    // non-whitespace character.
    var matches = /[^ \t]/.exec(line.line);
    var sliceEnd = matches !== null ? matches.index : line.line.length;
    var indent = line.line.slice(0, sliceEnd);

    // if there are no tabs or spaces on this line, don't bother
    if (indent.length === 0) {
        return [];
    }

    var output = [];

    var width = opts['indent-width'];
    if (width) {
        var i, l = 0;
        for (i = 0; i < indent.length; i++) {
            var c = indent[i];
            if (c === ' ') {
                l++;
            } else {
                if (l % width !== 0) { break; }
                l = 0;
            }
        }

        if (l % width !== 0 && !(opts['indent-width-cont'] &&
                                 line.line[indent.length] !== '<')) {
            output.push(new Issue('E036', [line.row, i - l + 1],
                                    { width: width }));
        }
    }

    var format = opts['indent-style'];
    if (format) {
        var space = / /.exec(indent);
        var tab  = /\t/.exec(indent);

        if (!this.current) {
            this.current = space ? 'spaces' : 'tabs';
        }

        // true if we require spaces, false if we require tabs
        var type = ((format === 'spaces') ||
                    (format === 'nonmixed' && this.current === 'spaces'));
        var error = type ? tab : space;

        if (error) {
            output.push(new Issue('E024', [line.row, error.index + 1],
                                    { type: type ? 'Tabs' : 'Spaces' }));
        }
    }

    return output;
};
