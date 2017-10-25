module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<div id="2fOwj_0o-3"></div>',
        opts: { 'id-class-style': false },
        output: 0
    }, {
        desc: 'should pass correctly styled id',
        input: '<div id="abc"></div>',
        opts: { 'id-class-style': 'lowercase' },
        output: 0
    }, {
        desc: 'should fail incorrectly styled id names',
        input: '<div id="foWj0wo3"></div>',
        opts: { 'id-class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should accept a "dash" option',
        input: '<div id="abc-def"></div>',
        opts: { 'id-class-style': 'dash' },
        output: 0
    }, {
        desc: 'should accept ids that use the BEM format',
        input: '<div id="pls-no"></div><div id="pls-no__yes"></div><div id="pls-no__yes--no"></div><div id="pls-no__yes-no--maybe"></div>',
        opts: {'id-class-style': 'bem'},
        output: 0
    }, {
        desc: 'should accept a custom format RegExp',
        input: '<div id="-___"></div><div id="fail"></div><div class="_--_-">',
        opts: {'id-class-style': /^[-_]+$/},
        output: 1
    }, {
        desc: 'should ignore ids matching ignore regex',
        input: '<div id="doge{{l**i(tec/oin}}coin"></div>',
        opts: {'id-class-style': 'lowercase', 'id-class-ignore-regex': '{{.*?}}'},
        output: 0
    }
];
