var Issue = require('../issue');

module.exports = {
    name: 'table-req-header',
    on: ['tag'],
    filter: ['table']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var children = ele.children;
    var childIndex = 0;

    //ffwd to first relevant table child
    while (children[childIndex] && children[childIndex].name &&
      (children[childIndex].name.match(/caption/i) ||
       children[childIndex].name.match(/colgroup/i) ||
       children[childIndex].name.match(/tfoot/i)
       )) {
        childIndex = childIndex + 1;
    }

    if (children[childIndex] && children[childIndex].name) {
      if (children[childIndex].name.match(/thead/i)) {
        return [];
      }

      if (children[childIndex].name.match(/tr/i) && children[childIndex].children[0].name.match(/th/i)) {
        return [];
      }
    }

    return new Issue('E035', ele.openLineCol);
};
