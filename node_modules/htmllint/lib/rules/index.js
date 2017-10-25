/* This file exports a map whose values are all of the
 * exported rules (with the rule names as their keys).
 */

var bulk = require('bulk-require');

// do a bulk require on all the files in this directory
// excluding this file
var rulesExport = bulk(__dirname, '!(index).js');

// loop over the exported rules to get a map of
// (rule name) -> (rule)
Object.keys(rulesExport)
    .forEach(function (key) {
        // retrieve the rule
        var rule = rulesExport[key];

        // export the rule under the rule.name property
        module.exports[rule.name] = rule;
    });
