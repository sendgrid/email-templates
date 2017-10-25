var glob = require('glob');
var path = require('path');

module.exports = function (root, globs, opts) {
    if (typeof globs === 'string') globs = [ globs ];
    if (!Array.isArray(globs)) return {};
    if (!opts) opts = {};
    opts.index = opts.index === false ? false : true
    var requireFn = opts.require || require;
    
    var xglobs = globs.map(function (g) {
        if (Array.isArray(g)) {
            return [ path.resolve(root, g[0]) ].concat(g.slice(1));
        }
        return path.resolve(root, g)
    });
    
    return walk(xglobs.reduce(function (acc, g) {
        var args = [];
        if (Array.isArray(g)) {
            args = g.slice(1);
            g = g[0];
        }
        var ex = glob.sync(g);
        
        ex.forEach(function (file) {
            var keys = keyOf(file);
            for (var node = acc, i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (i === keys.length - 1) {
                    if (!node[key]) node[key] = [ file ];
                    node[key].push.apply(node[key], args);
                }
                else {
                    if (!node[key]) node[key] = {};
                    node = node[key];
                }
            }
        });
        return acc;
    }, {}));
    
    function walk (node) {
        if (Array.isArray(node)) {
            var exp = requireFn(node[0]);
            var args = node.slice(1);
            if (args.length === 0) return exp;
            var mapF = function (f) {
                if (typeof f !== 'function') return f;
                return function () {
                    var args_ = args.concat([].slice.call(arguments));
                    return f.apply(this, args_);
                };
            };
            
            if (typeof exp === 'function') {
                return mapF(exp);
            }
            else if (Array.isArray(exp)) {
                return exp.map(mapF);
            }
            else if (exp && typeof exp === 'object') {
                return Object.keys(exp).reduce(function (acc, key) {
                    acc[key] = mapF(exp[key]);
                    return acc;
                }, {});
            }
            else return exp;
        }
        else if (typeof node === 'object') {
            var init = opts.index && node.index && typeof node.index[0] === 'string'
                && requireFn(node.index[0]);
            
            return Object.keys(node).reduce(function (acc, key) {
                acc[key] = walk(node[key]);
                return acc;
            }, init && typeof init === 'function' ? init : {});
        }
    }
    
    function keyOf (file) {
        var parts = path.relative(root, file).split(/\/|\\/);
        var len = parts.length;
        if (len) parts[len-1] = parts[len-1].replace(/\.[^.]*$/, '');
        return parts;
    }
};
