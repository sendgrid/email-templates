var lodash = require('lodash');

function RuleList() {
    this.rulesMap = {};
    this.subsMap = {};
}
module.exports = RuleList;

RuleList.fromRuleMap = function (ruleMap) {
    var ruleList = new RuleList();

    lodash.forOwn(ruleMap, function (rule) {
        ruleList.addRule(rule);
    });

    return ruleList;
};

RuleList.prototype.getRule = function (ruleName) {
    return this.rulesMap[ruleName];
};

RuleList.prototype.getSubscribers = function (subName) {
    var subs = this.subsMap[subName];

    return subs ? subs : [];
};

RuleList.prototype.addRule = function (rule) {
    var ruleName = rule.name;

    if (this.rulesMap[ruleName]) {
        this.removeRule(ruleName);
    }

    this.subscribeRule(rule);
    this.rulesMap[ruleName] = rule;
};

RuleList.prototype.removeRule = function (ruleName) {
    var rule = this.getRule(ruleName);

    if (rule) {
        this.unsubscribeRule(rule);
    }

    delete this.rulesMap[ruleName];
};

RuleList.prototype.unsubscribeRule = function (rule) {
    if (!rule.on) {
        return;
    }

    rule.on.forEach(function (subName) {
        var subIndex = this.subsMap[subName].indexOf(rule);
        this.subsMap[subName].splice(subIndex, 1);
    }.bind(this));
};

RuleList.prototype.subscribeRule = function (rule) {
    if (!rule.on) {
        return;
    }

    rule.on.forEach(function (subName) {
        if (!this.subsMap[subName]) {
            this.subsMap[subName] = [];
        }
        this.subsMap[subName].push(rule);
    }.bind(this));
};

RuleList.prototype.forEach = function (func) {
    lodash.forOwn(this.rulesMap, function (rule) {
        // this function call is wrapped because lodash.forOwn
        // passes back 3 args, this method should only pass back 1
        func(rule);
    });
};
