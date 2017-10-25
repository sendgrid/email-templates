var Issue = require('../issue');

module.exports = {
    name: 'table-req-caption',
    on: ['tag'],
    filter: ['table']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // get the children of this element
    var children = ele.children;

    // check for a caption element
    for (var i = 0; i < children.length; i++) {
        if (children[i].name === 'caption')
        {
            return [];
        }
    }
    //return an issue
    return new Issue('E031', ele.openLineCol);
};
