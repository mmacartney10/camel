var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var modelService = require('../services/model-service.js');

describe('When the model service is called', function() {
  describe('And a new model is being added', function() {
    it('Should return the modelId on success', function() {

      var testModelId = 'thisistestmodel';

      var result = modelService.addModel(testModelId).then(data => {
        return data;
      });

      return expect(result).to.eventually.equal(testModelId);
    });
  });

  describe('And a new model is being added that already exists', function() {
    it('Should return a message saying Model already exists', function() {
      var testModelId = 'thisistestmodel';

      var result = modelService.addModel(testModelId).then(data => {
        return data;
      });

      return expect(result).to.eventually.be.rejectedWith('Model already exists');
    });
  });
});
