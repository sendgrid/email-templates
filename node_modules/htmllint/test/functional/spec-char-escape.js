module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<div><p>Hello & hello</p></div>',
        opts: { 'spec-char-escape': false },
        output: 0
    },
    {
        desc: 'should recognize special characters inside of text elements',
        input: '<div><p class="className" id="IdName" label="label" >Hello & hello</p></div>',
        opts: { 'spec-char-escape': true },
        output: 1
    },
    {
        desc: 'should recognize special characters in attribute values',
        input: '<div><p id="mine&ours" class="yours>mine"></p></div>',
        opts: { 'spec-char-escape': true },
        output: 1
    }
];
