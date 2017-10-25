var Issue = require('../issue');

module.exports = {
    name: 'line-end-style',
    on: ['line']
};

module.exports.lint = function (line, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    format = format.toLowerCase();
    var regex = {
        cr:   /(^|[^\n\r])\r$/,
        lf:   /(^|[^\n\r])\n$/,
        crlf: /(^|[^\n\r])\r\n$/
    }[format];

    if (regex.test(line.line)) {
        return [];
    }

    var len = line.line.length,
        pos = [line.row, len];

    if (line.line[len - 2] === '\r') {
        pos[1] -= 1;
    }

    return new Issue('E015', pos, { format: format });
};
