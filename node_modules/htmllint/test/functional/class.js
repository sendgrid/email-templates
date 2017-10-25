module.exports = [
    // class-style
    {
        desc: 'should pass when set to false',
        input: '<div id="2fOwj_0o-3" class="0r9jfFJ2"></div>',
        opts: { 'class-style': false },
        output: 0
    }, {
        desc: 'should pass correctly styled class',
        input: '<div class="fowj0wo3"></div>',
        opts: { 'class-style': 'lowercase' },
        output: 0
    }, {
        desc: 'should fail incorrectly styled class names',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should accept a "dash" option',
        input: '<div class="fowj-awo3-fqowj"></div>',
        opts: { 'class-style': 'dash' },
        output: 0
    }, {
        desc: 'should accept a class that specifies multiple names',
        input: '<div class="pls no"></div>',
        opts: {'class-style': 'lowercase'},
        output: 0
    }, {
        desc: 'should accept classes that use the BEM format',
        input: '<div class="pls-no"></div><div class="pls-no__yes"></div><div class="pls-no__yes--no"></div><div class="pls-no__yes-no--maybe"></div>',
        opts: {'class-style': 'bem'},
        output: 0
    }, {
        desc: 'should accept a custom format RegExp',
        input: '<div class="pAsS-one"></div><div class="fail"></div><div class="pAsS-two">',
        opts: {'class-style': /^([a-z][A-Z])+(-[a-z]*)*$/},
        output: 1
    }, {
        desc: 'should ignore classes matching ignore regex',
        input: '<div class="pls {{no0 oO&}}"></div>',
        opts: {'class-style': 'lowercase', 'id-class-ignore-regex': '{{.*?}}'},
        output: 0
    }, {
        desc: 'should fail classes not matching ignore regex',
        input: '<div class="pls {{no0 oO&}} fe<doracoin"></div>',
        opts: {'class-style': 'lowercase', 'id-class-ignore-regex': '{{.*?}}'},
        output: 1
    }, {
        desc: 'should use id-class-style option if class-style is false',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'class-style': false, 'id-class-style': 'lowercase' },
        output: 1
    },

    // class-no-dup
    {
        desc: 'should pass when set to false',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': false },
        output: 0
    }, {
        desc: 'should pass when there are no duplicates',
        input: '<body><div><p class="hey hi">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 0
    }, {
        desc: 'should catch duplicates when set to true',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 1
    }, {
        desc: 'should catch multiple duplicates in one class',
        input: '<body><div><p class="hey hey hi ho ho">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 2
    },

    // check ignore splitting
    {
        desc: 'should catch duplicates with a custom separator',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'id-class-ignore-regex': '{.*?}' },
        output: 1
    }, {
        desc: 'should not catch non-duplicates with a custom separator',
        input: '<body><div><p class="hi {foo bar} {foo x bar} hello ">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'id-class-ignore-regex': '{.*?}' },
        output: 0
    }, {
        desc: 'should catch multiple duplicates with a custom separator',
        input: '<body><div><p class="hey {foo bar} hey hi {foo bar}">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'id-class-ignore-regex': '{.*?}' },
        output: 2
    }, {
        desc: 'should not fail if id-class-ignore-regex has capturing groups',
        input: '<body><div><p class="  hey {foo bar} hi {foo baz}">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'id-class-ignore-regex': '(({)(.*?)})' },
        output: 0
    }, {
        desc: 'should not fail if id-class-ignore-regex has literal parens',
        input: '<body><div><p class="hi {(foo bar)} {(foo baz)} hey">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'id-class-ignore-regex': '{\(.*?\)}' },
        output: 0
    }
];
