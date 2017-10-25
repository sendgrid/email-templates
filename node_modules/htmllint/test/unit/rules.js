describe('htmllint.rules', function () {
    var rules = require('../../').rules;

    Object.keys(rules).forEach(function (ruleName) {
        var rule = rules[ruleName];

        describe(ruleName, function () {
            it('should have a name', function () {
                expect(rule).to.have.property('name');
            });

            it('should have a name that matches the registered one', function () {
                expect(rule.name).to.be.equal(ruleName);
            });
        });
    });
});
