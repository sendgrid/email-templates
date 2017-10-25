# htmllint [![npm version](http://img.shields.io/npm/v/htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint) [![license](http://img.shields.io/npm/l/htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint) [![build status](http://img.shields.io/travis/htmllint/htmllint/master.svg?style=flat-square)](https://travis-ci.org/htmllint/htmllint) [![coveralls](http://img.shields.io/coveralls/htmllint/htmllint.svg?style=flat-square)](https://coveralls.io/r/htmllint/htmllint)

[![stories in ready](https://badge.waffle.io/htmllint/htmllint.svg?label=ready&title=Ready)](http://waffle.io/htmllint/htmllint)
[![dependencies](http://img.shields.io/david/htmllint/htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)
[![devDependencies](http://img.shields.io/david/dev/htmllint/htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)

> An unofficial html5 linter and validator.

htmllint uses a parser to get the DOM for your html. It then runs uses the provided rules (and default rules) to lint both the DOM and then individual lines. [Take a look at the supported options](https://github.com/htmllint/htmllint/wiki/Options).

Using htmllint
--------------
If you'd like to run htmllint, we have a few options.

This module doesn't provide any interface on its own. It is highly recommended that
you use one of the following modules to run the linter:
* [`grunt-htmllint`](https://github.com/htmllint/grunt-htmllint): a grunt plugin for htmllint
* [`htmllint-cli`](https://github.com/htmllint/htmllint-cli): a cli interface for htmllint (NOTE: not complete at the moment)

Getting Started with Contributing
---------------

You can use htmllint in Node.JS by using   
```
require('htmllint')  
```
in your code, and doing an install with  
```
npm install htmllint
```
(Remember `--save-dev` if this is just for your development).  

### Now What?

To learn more about the options and usage of htmllint, check out the
[user manual](https://github.com/htmllint/htmllint/wiki/htmllint-manual).
  


[![npm](https://nodei.co/npm/htmllint.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/htmllint)
