var lodash = require('lodash');

function addRuleToIssue (issue, ruleName) {

    if (Array.isArray(issue)) {
        issue.forEach(function (issue) {
            addRuleToIssue(issue, ruleName);
        });
    }
    else {
        issue.rule = issue.rule || ruleName;
    }

}

module.exports = {
    applyRules: function(rules, element, opts) {
        if (!rules) {
            return [];
        }

        return lodash.flattenDeep(rules.map(function(rule) {
            var issues = rule.lint.call(rule, element, opts);

            addRuleToIssue(issues, rule.name);

            return issues;
        }));

    }
};
