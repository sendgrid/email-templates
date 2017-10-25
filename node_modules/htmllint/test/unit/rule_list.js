describe('RuleList', function () {
    var RuleList = require('../../lib/rule_list');
    var ruleList = null,
        rule = null;

    beforeEach(function () {
        ruleList = new RuleList();
        rule = {
            name: 'therule',
            on: ['html']
        };
    });

    it('should be a function', function () {
        expect(RuleList).to.be.an.instanceOf(Function);
    });

    describe('getRule', function () {
        it('should return undefined for nonexistant rule', function () {
            var rule = ruleList.getRule('nonexistant');

            expect(rule).to.be.a('undefined');
        });
    });

    describe('getSubscribers', function () {
        it('should return an empty array for rule with no subscribers', function () {
            var subs = ruleList.getSubscribers('nonexistant');

            expect(subs).to.be.eql([]);
        });
    });

    describe('addRule', function () {
        it('should add a rule', function () {
            ruleList.addRule(rule);

            var addedRule = ruleList.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });

        it('should subscribe the rule', function () {
            ruleList.addRule(rule);

            var subs = ruleList.getSubscribers(rule.on[0]);

            expect(subs).to.be.eql([rule]);
        });

        it('should remove a previous rule', function () {
            var oldRule = {};
            oldRule.name = rule.name;

            ruleList.addRule(oldRule);
            ruleList.addRule(rule);

            var addedRule = ruleList.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });
    });

    describe('removeRule', function () {
        it('should remove a rule', function () {
            ruleList.addRule(rule);
            ruleList.removeRule(rule.name);

            var addedRule = ruleList.getRule(rule.name);

            expect(addedRule).to.be.a('undefined');
        });

        it('should unsubscribe a rule', function () {
            ruleList.addRule(rule);
            ruleList.removeRule(rule.name);

            var subs = ruleList.getSubscribers(rule.on[0]);

            expect(subs).to.be.eql([]);
        });

        it('should not throw when removing a nonregistered rule', function () {
            ruleList.removeRule('nonexistant');
        });
    });

    describe('subscribeRule', function () {
        it('should not throw when given rule with no subscriptions', function () {
            expect(function () {
                ruleList.subscribeRule({});
            }).to.not.throw(Error);
        });

        it('should subscribe a rule', function () {
            ruleList.subscribeRule(rule);

            var subs = ruleList.getSubscribers(rule.on[0]);

            expect(subs).to.be.eql([rule]);
        });
    });

    describe('unsubscribeRule', function () {
        it('should not throw when given rule with no subscriptions', function () {
            expect(function () {
                ruleList.unsubscribeRule({});
            }).to.not.throw(Error);
        });

        it('should unsubscribe a rule', function () {
            ruleList.subscribeRule(rule);
            ruleList.unsubscribeRule(rule);

            var subs = ruleList.getSubscribers(rule.on[0]);

            expect(subs).to.be.eql([]);
        });
    });
});
