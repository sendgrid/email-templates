var Issue = require('../issue');

module.exports = {
    name: 'attr-new-line',
    on: ['tag']
};

module.exports.lint = function(element, opts) {

    if ((!opts[this.name] || !element.dupes) && opts[this.name] !== 0) {
        return [];
    }

    var isPlus = opts[this.name] === '+0';
    var aRowLimit = Math.floor(opts[this.name]);

    var numberOfAttrsOnFirstRow = 0;
    var maxNumberOfAttrsOnAllRows = -1;
    var aNumber = Object.keys(element.attribs).length;

    var currentNumberOfAttrsInRow = 0;
    var currentRowNumber = aNumber > 0 && /\s*\w+\s*\n\s*/.test(element.open) ? 1 : 0;
    var prevRowNumber = currentRowNumber;
    var prevLineNumber = -1;


    Object.keys(element.attribs).forEach(function(attrName) {

        prevRowNumber = currentRowNumber;

        if (prevLineNumber !== -1 && prevLineNumber !== element.attribs[attrName].valueLineCol[0]) {

            if (maxNumberOfAttrsOnAllRows < currentNumberOfAttrsInRow) {
                maxNumberOfAttrsOnAllRows = currentNumberOfAttrsInRow;
            }

            if (currentRowNumber === 0) {
                numberOfAttrsOnFirstRow = currentNumberOfAttrsInRow;
            }

            currentNumberOfAttrsInRow = 0;
            currentRowNumber++;
        }

        if (prevRowNumber === currentRowNumber) {
            currentNumberOfAttrsInRow++;
        }

        prevLineNumber = element.attribs[attrName].valueLineCol[0];
    });

    if (maxNumberOfAttrsOnAllRows < currentNumberOfAttrsInRow) {
        maxNumberOfAttrsOnAllRows = currentNumberOfAttrsInRow;
    }

    if (currentRowNumber === 0) {
        numberOfAttrsOnFirstRow = currentNumberOfAttrsInRow;
    }

    if ((numberOfAttrsOnFirstRow > aRowLimit || maxNumberOfAttrsOnAllRows > Math.max(1,aRowLimit)) && !(isPlus && aNumber === 1)) {
        return new Issue('E037', element.openLineCol, {
            limit: aRowLimit
        });
    }

    return [];
};
