module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<img height="200" src="test.gif" class="test" width="300"></img>',
        opts: { 'attr-order': false },
        output: 0
    },
    {
        desc: 'should pass when attribute order is consistent with option',
        input: '<img class="test" src="test.gif" height="200" width="300"></img>',
        opts: { 'attr-order': ['class','src','height','width'] },
        output: 0
    },
    {
        desc: 'should fail when attribute order is reversed',
        input: '<img src="test.gif" class="test"></img>',
        opts: { 'attr-order': ['class','src'] },
        output: 1
    },
    {
        desc: 'should give one error per misplaced attribute',
        input: '<img src="test.gif" class="test" width="300" height="200"></img>',
        opts: { 'attr-order': ['class','src','height','width'] },
        output: 2
    },
    {
        desc: 'should pass even when some attributes are not present',
        input: '<img src="test.gif" height="200" width="300"></img>',
        opts: { 'attr-order': ['class','src','height','width'] },
        output: 0
    },
    {
        desc: 'should not give additional errors for attributes which are not present',
        input: '<img src="test.gif" class="test"></img>',
        opts: { 'attr-order': ['class','src','height','width'] },
        output: 1
    }
];
