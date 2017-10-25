var knife = require('../knife');

module.exports = {
    name: 'tag',
    on: ['dom'],
    filter: ['tag']
};

module.exports.lint = function(element, opts) {
    var matcher = knife.matchFilter.bind(knife, element.name);

    var s = this.subscribers.filter(matcher);
    return knife.applyRules(s, element, opts);
};
