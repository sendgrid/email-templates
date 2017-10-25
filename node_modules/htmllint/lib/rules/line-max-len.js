var Issue = require('../issue');

module.exports = {
  name: 'line-max-len',
  on: ['line']
};

module.exports.lint = function (line, opts) {
  var maxLength = opts[this.name];
  var ignoreRegExpString = opts[this.name + '-ignore-regex'];
  var lineText;
  var len;
  var pos;

  if (!maxLength) {
    return [];
  }

  lineText = line.line.replace(/(\r\n|\n|\r)$/, '');

  if (ignoreRegExpString && (new RegExp(ignoreRegExpString, 'g')).test(lineText)) {
    return [];
  }

  len = lineText.length;

  if (len <= maxLength) {
    return [];
  }

  pos = [line.row, len];

  return new Issue('E040', pos, { maxlength: maxLength, length: len });
};
