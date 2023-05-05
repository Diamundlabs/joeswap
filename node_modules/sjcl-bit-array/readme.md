# sjcl-bit-array

A modular fork of the [sjcl](https://github.com/bitwiseshiftleft/sjcl) bitArray namespace.

[![Build status](https://travis-ci.org/michaelrhodes/sjcl-bit-array.svg?branch=master)](https://travis-ci.org/michaelrhodes/sjcl-bit-array)

## Install

```sh
$ npm install sjcl-bit-array
```

## Usage

As described at in the [sjcl docs](http://bitwiseshiftleft.github.io/sjcl/doc/symbols/sjcl.bitArray.html) but with each method required separately.

```js
var bitLength = require('sjcl-bit-array/bit-length')
var bitSlice = require('sjcl-bit-array/bit-slice')
var clamp = require('sjcl-bit-array/clamp')
var concat = require('sjcl-bit-array/concat')
var equal = require('sjcl-bit-array/equal')
var extract = require('sjcl-bit-array/extract')
var getPartial = require('sjcl-bit-array/get-partial')
var partial = require('sjcl-bit-array/partial')
```

## License

BSD or GPL 2.0
