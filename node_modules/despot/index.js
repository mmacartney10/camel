var util         = require('util'),
    events       = require('events'),
    EventEmitter = events.EventEmitter

module.exports = function() {

  var Despot = function() {

    if (arguments.callee._singletonInstance) {
      return arguments.callee._singletonInstance
    }

    arguments.callee._singletonInstance = this
    EventEmitter.call(this)
  }

  util.inherits(Despot, EventEmitter)

  return new Despot()
}()
