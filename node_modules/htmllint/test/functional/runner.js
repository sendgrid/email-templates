var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    htmllint = require('../../lib'),
    presets = require('../../lib/presets');

// find all files in this directory that are .js files
var testFiles = fs.readdirSync(__dirname)
    .filter(function (filepath) {
        return (path.extname(filepath) === '.js' &&
                path.basename(filepath) !== 'runner.js');
    })
    .map(function (filepath) {
        var basename = path.basename(filepath, '.js');

        return {
            name: basename,
            mod: require('./' + basename)
        };
    });

function createLinter(rules) {
    rules = rules.concat(['dom', 'line', 'attr', 'tag']);

    var ruleMap = rules.reduce(function (map, rule) {
        if (typeof rule === 'string') {
            rule = htmllint.rules[rule];
        }

        map[rule.name] = rule;

        return map;
    }, {});

    return new htmllint.Linter(ruleMap);
}

function doTest(funcTest, testFile) {
    it(funcTest.desc, function (cb) {
        // configure a new linter
        var linter = createLinter(funcTest.rules),
            opts = funcTest.opts || testFile.defaults;

        var promise = linter.lint(funcTest.input, presets.presets.none, opts),
            expected = funcTest.output;

        promise.then(function (output) {
            if (lodash.isNumber(expected)) {
                // test expects a certain number of issues
                expect(output).to.have.length(expected);
            } else {
                // TODO: order probably shouldn't matter
                // TODO: better assertion messages
                expected.forEach(function (expectedIssue, index) {
                    if (output.length <= index) {
                        // only validate if the length is right,
                        // length is tested later
                        return;
                    }

                    var actual = output[index];
                    // validate on each property specified in the expected issue
                    Object.keys(expectedIssue)
                        .forEach(function (key) {
                            expect(actual[key]).to.be.equal(expectedIssue[key]);
                        });
                });
                expect(output).to.have.length(expected.length);
            }
        }).then(cb, cb);
    });
}

// for each test file, create a test suite
testFiles.forEach(function (testFile) {
    describe(testFile.name, function () {
        testFile.mod.forEach(function (test) {
            if (!test.hasOwnProperty('rules')) {
                // if no rules are specified, use the filename
                test.rules = [testFile.name];
                if (!test.defaults) {
                    test.defaults = {};
                }
            }

            doTest(test, testFile);
        });
    });
});
