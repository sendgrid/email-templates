#!/usr/bin/env node

var chalk = require('chalk'),
    cjson = require('cjson'),
    Liftoff = require('liftoff'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    Promise = require('bluebird');

var readFilePromise = Promise.promisify(fs.readFile),
    globPromise = Promise.promisify(glob);

var app = new Liftoff({
    processTitle: 'htmllint',
    moduleName: 'htmllint',
    configName: '.htmllint',
    extensions: {
        'rc': null
    }
});

var argv = require('yargs')
        .usage([
            'Lints html files with htmllint.',
            'Usage: $0 [OPTIONS] [ARGS]'
        ].join('\n'))
        .version(require('../package.json').version + '\n', 'version')
        .example('$0', 'lints all html files in the cwd and all child directories')
        .example('$0 init', 'creates a default .htmllintrc in the cwd')
        .example('$0 *.html', 'lints all html files in the cwd')
        .example('$0 public/*.html', 'lints all html files in the public directory')
        .default('rc', null)
        .describe('rc', 'path to a htmllintrc file to use (json)')
        .default('cwd', null)
        .describe('cwd', 'path to use for the current working directory')
        .help('help')
        .argv;

var args = argv._;

app.launch({
    cwd: argv.cwd,
    configPath: argv.rc
}, function (env) {
    var cwd = argv.cwd || process.cwd();

    if (args[0] === 'init') {
        // copy .htmllintrc file
        var srcPath = path.join(__dirname, '../lib/default_cfg.json'),
            outputPath = path.join(env.cwd, '.htmllintrc');

        var readStream = fs.createReadStream(srcPath);
        readStream.on('error', function (err) {
            console.error('error reading default config file: ', err);
        });

        var writeStream = fs.createWriteStream(outputPath);
        writeStream.on('error', function (err) {
            console.error('error writing config file: ', err);
        });

        readStream.pipe(writeStream);
        return;
    }

    var htmllintPath = 'htmllint';

    if (env.modulePath) {
        var cliPackage = require('../package.json'),
            semver = require('semver');

        var acceptedRange = cliPackage.dependencies.htmllint,
            localVersion = env.modulePackage.version;

        if (semver.satisfies(localVersion, acceptedRange)) {
            htmllintPath = env.modulePath;
        } else {
            console.log(
                chalk.red('local htmllint version is not supported:'),
                chalk.magenta(localVersion, '!=', acceptedRange)
            );
            console.log('using builtin version of htmllint');
        }
    }

    var htmllint = require(htmllintPath);

    if (!env.configPath) {
        console.log(
            chalk.red('local .htmllintrc file not found'),
            '(you can create one using "htmllint init")'
        );
        process.exit(1);
    }

    var cfg = cjson.load(env.configPath);

    htmllint.use(cfg.plugins || []);
    delete cfg.plugins;

    if (!args.length) {
        args = ['**/*.html'];
    }

    function lintFile(filename) {
        var filepath = path.join(cwd, filename);

        return readFilePromise(filepath, 'utf8')
            .then(function (src) {
                return htmllint(src, cfg);
            })
            .then(function (issues) {
                issues.forEach(function (issue) {
                    var msg = [
                        chalk.magenta(filename), ': ',
                        'line ', issue.line, ', ',
                        'col ', issue.column, ', ',
                        chalk.red(htmllint.messages.renderIssue(issue))
                    ].join('');

                    console.log(msg);
                });

                return { errorCount: issues.length };
            })
            .catch(function (err) {
                // MC: muahahahahah :D
                throw ('[htmllint error in ' + filename + ' ] ' + err);
            });
    }

    Promise.all(
        args.map(function (pattern) {
            return globPromise(pattern, { cwd: cwd });
        })
    ).then(function (filesArr) {
        var files = Array.prototype.concat.apply([], filesArr);

        return Promise.settle(
            files.map(lintFile)
        );
    }, function (err) {
        console.error(chalk.red.bold('error during glob expansion:'), err);
    }).done(function (results) {
        var errorCount = 0;

        console.log('');

        results.forEach(function (result) {
            if (result.isFulfilled()) {
                var resultValue = result.value();

                errorCount += resultValue.errorCount;
            } else {
                console.error(chalk.bold.red(result.reason()));
            }
        });

        console.log(chalk.yellow('[htmllint] found %d errors out of %d files'),
                   errorCount, results.length);

        if (errorCount > 0) {
            process.exit(1);
        }
    });
});
