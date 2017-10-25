var Issue = require('../issue');

module.exports = {
    name: 'fig-req-figcaption',
    on: ['tag'],
    filter: ['figure', 'figcaption']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    if (ele.name === 'figure') {
        // get the children of this figure
        var children = ele.children;

        // check for a figcaption element
        for (var i = 0; i < children.length; i++) {
            if (children[i].name === 'figcaption') {
                return [];
            }
        }
    } else { // ele.name === 'figcaption'
        if (ele.parent && ele.parent.name === 'figure'){
            return [];
        }
    }
    //return an issue
    return new Issue('E032', ele.openLineCol);
};
