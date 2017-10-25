htmllint-cli
============

[![npm version](http://img.shields.io/npm/v/htmllint-cli.svg?style=flat-square)](https://npmjs.org/package/htmllint-cli)
[![ISC license](http://img.shields.io/npm/l/htmllint-cli.svg?style=flat-square)](https://npmjs.org/package/htmllint-cli)
[![dependencies](http://img.shields.io/david/htmllint/htmllint-cli.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint-cli)
[![devDependencies](http://img.shields.io/david/dev/htmllint/htmllint-cli.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint-cli)

[![stories in ready](https://badge.waffle.io/htmllint/htmllint-cli.svg?label=ready&title=Ready)](http://waffle.io/htmllint/htmllint-cli)

Installing
----------

Install [nodejs](http://nodejs.org/) and install the `htmllint-cli` module globally:

```sh
# you may have to sudo this line depending on your installation
$ npm install -g htmllint-cli
```

Once installed, create a configuration file for your project:

```sh
$ cd your-project
$ htmllint init
```

This should create a `.htmllintrc` file in your current directory. This file should
be a valid JSON file that contains options defined
[on the htmllint wiki](https://github.com/htmllint/htmllint/wiki/Options).

After creating your configuration, you can lint some files like so:

```sh
$ htmllint index.html
# also supports glob expansions
$ htmllint **/*.html
$ htmllint # by default expands to **/*.html

$ htmllint --help # to get more information
```

Contributing
------------

You can use `npm link` to help with development.
