[![Build Status](https://travis-ci.org/binarykitchen/despot.svg?branch=master)](https://travis-ci.org/binarykitchen/despot)

# Despot

A global event bus driven by a singlton event emitter class. Use this module to hook something in other objects.

Originally forked from https://github.com/teawithfruit/node-singleton-event with the difference that it also works on silly browsers ... IE.

Beware it's very controversial to have a singleton acting as an event emitter. Depends on your app architecture. The fact that nodejs/iojs caches any `module.exports` makes it easy to build one. IMO it's useful for rapid prototyping but not recommended for high performance apps.

## Install
```
npm i -S despot
```

## How to use
Require it in every file where you want to communicate with another file.

Say something:
```js
var despot = require('despot');
despot.emit('talk', 'hello world');
```

Receive something:
```js
var despot = require('despot');
despot.on('talk', function(value) {
  console.log(value);
});
```
