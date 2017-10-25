module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<HTML><seCtion></section></HtML>',
        opts: { 'tag-name-match': false },
        output: 0
    }, {
        desc: 'should pass for matching tags',
        input: '<boDY></boDY>',
        opts: { 'tag-name-match': true },
        output: 0
    }, {
        desc: 'should fail for non-matching tags',
        input: '<boDY></bODy>',
        opts: { 'tag-name-match': true },
        output: 1
    }, {
        desc: 'should fail for each non-matching set',
        input: '<HTML><section></seCtion></html>',
        opts: { 'tag-name-match': true, 'tag-close': true },
        output: 2
    }, {
        desc: 'should not fail for self-closing tags',
        input: '<html><br/></html>',
        opts: { 'tag-name-match': true },
        output: 0
    },
    {
        desc: 'should pass when set to false',
        input: '<html><div></html>',
        opts: { 'tag-close': false, 'tag-name-match': true },
        output: 0
    }, {
        desc: 'should pass tag-close for properly closed tags',
        input: '<html><div></div></html>',
        opts: { 'tag-close': true },
        output: 0
    }, {
        desc: 'should fail tag-close for non-closed tags',
        input: '<html><div></html>',
        opts: { 'tag-close': true },
        output: 1
    }, {
        desc: 'should fail tag-close for improperly closed tags',
        input: '<html><div></din></html>',
        opts: { 'tag-close': true },
        output: 1
    }, {
        desc: 'tag-close should correctly handle omitted optional </p>',
        input: '<p> closed </p><p> not closed <p> closed </p>',
        opts: { 'tag-close': 'always' },
        output: 1
    }, {
        desc: 'tag-close should correctly handle omitted optional </head> and </body>',
        input: '<head> unclosed <body> tags',
        opts: { 'tag-close': 'always' },
        output: 2
    },
    {
        desc: 'should not match non-self-closing tags when disabled',
        input: '<img>',
        opts: { 'tag-self-close': false },
        output: 0
    }, {
        desc: 'tag-name-match or tag-close should not match non-self-closing tags',
        input: '<img>',
        opts: { 'tag-self-close': false, 'tag-name-match': true, 'tag-close': true },
        output: 0
    }, {
        desc: 'should match non self-closing tags when set to always',
        input: '<img>',
        opts: { 'tag-self-close': 'always' },
        output: 1
    }, {
        desc: 'should not match self-closed tags when set to always',
        input: '<img/>',
        opts: { 'tag-self-close': 'always' },
        output: 0
    }, {
        desc: 'should match non self-closing tags when set to never',
        input: '<img/>',
        opts: { 'tag-self-close': 'never' },
        output: 1
    }, {
        desc: 'should not match self-closed tags when set to never',
        input: '<img>',
        opts: { 'tag-self-close': 'never' },
        output: 0
    }
];
