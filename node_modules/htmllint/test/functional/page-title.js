module.exports = [
    {
        desc: 'head-req-title should pass when set to false',
        input: '<head></head>',
        opts: { 'head-req-title': false },
        output: 0
    }, {
        desc: 'head-req-title should pass when a title is present',
        input: '<head><title>Title!</title></head>',
        opts: { 'head-req-title': true },
        output: 0
    }, {
        desc: 'head-req-title should fail when no title is present',
        input: '<head></head>',
        opts: { 'head-req-title': true },
        output: 1
    }, {
        desc: 'head-req-title should fail when title is empty',
        input: '<head><title></title></head>',
        opts: { 'head-req-title': true },
        output: 1
    }, {
        desc: 'head-req-title should pass when some title is nonempty',
        input: '<head><title></title><title>For real this time</title></head>',
        opts: { 'head-req-title': true },
        output: 0
    },
    {
        desc: 'title-no-dup should pass when set to false',
        input: '<head><title>Tile</title><title>No wait title</title>'
            + '<title>More titles for good measure</title></head>',
        opts: { 'title-no-dup': false },
        output: 0
    }, {
        desc: 'title-no-dup should pass when only one title is present',
        input: '<head><title>Title!</title></head>',
        opts: { 'title-no-dup': true },
        output: 0
    }, {
        desc: 'title-no-dup should fail when multiple titles are present',
        input: '<head><title>Title</title><title>Another title</title></head>',
        opts: { 'title-no-dup': true },
        output: 1
    }, {
        desc: 'title-no-dup should fail only once for many titles',
        input: '<head><title>Mr.</title><title>Dr.</title>'
            + '<title>Professor</title></head>',
        opts: { 'title-no-dup': true },
        output: 1
    },
    {
        desc: 'title-max-len should pass when set to false',
        input: '<head><title>looooooooooooooooooooooooooooooooooooooooo'
            + 'oooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            + 'oooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
            + 'ooooooooooooooooooooooooooooooooooooooong</title></head>',
        opts: { 'title-max-len': false },
        output: 0
    }, {
        desc: 'title-max-len should pass when the title fits requirements',
        input: '<head><title>Title!</title></head>',
        opts: { 'title-max-len': 60 },
        output: 0
    }, {
        desc: 'title-max-len should fail for long titles',
        input: '<head><title>Tiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
            + 'iiiiiiiiiiiiiiiiiiiitle</title></head>',
        opts: { 'title-max-len': 60 },
        output: 1
    }, {
        desc: 'title-max-len should fail for short maximum lengths',
        input: '<head><title>Title!</title></head>',
        opts: { 'title-max-len': 4 },
        output: 1
    }
];
