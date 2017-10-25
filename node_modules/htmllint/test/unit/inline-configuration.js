var lint = require('../../'),
    InlineConfig = require('../../lib/inline_config.js'),
    lodash = require('lodash');

var textSplit = [
    '<!DOCTYPE html>', // 15
    '<html>', // 6
    '\r', // 0
    '<head>', // 6
    '\t<meta charset="utf-8" />',
    '\t<title>Hello, World!</title>',
    '</head>',
    '\r',
    '<body>',
    '\t<h1 id="heading">Heading</h1>',
    '\t<p>Paragraph</p>',
    '\t<div id="heading">',
    '\t\t<div role="supra">This inside that</div>',
    '\t\t<div class="ad">This inside that</div>',
    '\t</div>',
    '</body>',
    '\r',
    '</html>'
];

function meetExpectations(output, expectation) {
    if (output.length !== expectation.length) {
        return false;
    }

    for (var i = 0; i < output.length; i++) {
        if (output[i].name !== expectation[i].name ||
            expectation[i].line && (output[i].line !== expectation[i].line)) {
            return false;
        }
    }

    return true;
}

describe('inline-configuration', function () {
    var original = null;
    var expdefault = [
        { code: 'E015', line: 3 },
        { code: 'E015', line: 8 },
        { code: 'E015', line: 17 },
        { code: 'E012' },
        { code: 'E010' }
    ];
    var expshift = [
        { code: 'E015', line: 3 },
        { code: 'E015', line: 9 },
        { code: 'E015', line: 18 },
        { code: 'E012' },
        { code: 'E010' }
    ];
    var expfalse = [0,3,4].map(
        function(i) { return expdefault[i]; }
    );

    beforeEach(function () {
        original = lodash.cloneDeep(textSplit);
    });

    // Tests for inlineConfig internals
    // Should instantiate an object rather than using the prototype
    it('should throw when indices are passed to getOptsAtInex out of order', function () {
        expect(InlineConfig.prototype.getOptsAtIndex.bind(this,-10))
            .to.throw();
    });
    it('should throw when a config is added twice', function () {
        var c = new InlineConfig(original);
        c.addConfig({end: 5});
        expect(c.addConfig.bind(c,{end: 5})).to.throw();
    });

    it('should not do anything if no inline config comments exist', function () {
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expdefault);
            expect(result).to.be.eql(true);
        });
    });

    it('should not do anything on an empty tag', function () {
        original.splice(3, 0, '<!-- htmllint -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expshift);
            expect(result).to.be.eql(true);
        });
    });

    it('should change options to turn off rules', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expfalse);
            expect(result).to.be.eql(true);
        });
    });

    it('should accept $preset notation', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="$none" -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expfalse);
            expect(result).to.be.eql(true);
        });
    });

    it('should use allow $previous to revert value', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->'
                            + '<!-- htmllint line-end-style="$previous" -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expfalse);
            expect(result).to.be.eql(true);
        });
    });

    it('should throw on invalid $preset', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="$invalid" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should work without quotes', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style=false -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expfalse);
            expect(result).to.be.eql(true);
        });
    });

    it('should work for strings without quotes', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style=lf -->');
        return lint(original.join('\n') + '\n').then(function (output) {
            var result = meetExpectations(output, expshift);
            expect(result).to.be.eql(true);
        });
    });

    it('should throw an error on bad config formatting', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup-"false" id-class-no-ad="false" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should throw an error on bad options', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup-"false" id-no-no-ad="false" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should throw on invalid option value', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="fal#se" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should throw on nonexistent rule name', function () {
        original.splice(4, 0, '<!-- htmllint not-rule="false" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should throw on invalid rule name', function () {
        original.splice(3, 0, '<!-- htmllint pre#set="none" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });

    it('should change multiple rules', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup="false" id-class-no-ad="false" -->');

        lint(original.join('\n') + '\n').then(function (output) {

            // TODO: examine this test case, it passes when it probably shouldn't >.>
            var expectation = [
                {
                    name: 'line-end-style',
                    line: 3
                }
            ];
            var result = meetExpectations(output, expectation);

            expect(result).to.be.eql(true);
        });
    });

    it('should take in presets', function () {
        original.splice(1, 0, '<!-- htmllint preset="none" -->');

        lint(original.join('\n') + '\n').then(function (output) {
            var expectation = [];
            var result = meetExpectations(output, expectation);

            expect(result).to.be.eql(true);
        });
    });

    it('should throw on invalid preset option', function () {
        original.splice(3, 0, '<!-- htmllint preset="invalid" -->');
        expect(lint(original.join('\n') + '\n')).to.eventually.throw(Error);
    });
});
