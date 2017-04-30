var assert = require("assert"),
    despot = require("../")

describe('Despot', function() {

  describe('send and receive', function() {

    it('should return "hello world"', function() {

      var received = false

      despot.on('talk', function(value) {
        received = value;
      })

      despot.emit('talk', 'hello world')

      assert.equal('hello world', received)
    })
  })
})
