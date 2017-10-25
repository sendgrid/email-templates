var lodash = require('lodash');

var formats = {
    lowercase: /^[a-z][a-z\d]*$/,
    underscore: /^[a-z][a-z\d]*(_[a-z\d]+)*$/,
    dash: /^[a-z][a-z\d]*(-[a-z\d]+)*$/,
    camel: /^[a-zA-Z][a-zA-Z\d]*$/,
    bem: /^([a-z][a-z\d]*(-[a-z\d]+)*(--[a-z\d]+)*(__[a-z\d]+)*)+$/
};

module.exports = {
    getFormatTest: function (name) {
        var regex = lodash.isRegExp(name) ? name : formats[name];

        return regex.test.bind(regex);
    }
};
