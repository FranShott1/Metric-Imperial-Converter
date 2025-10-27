const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // Test 1: Valid input
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  // Test 2: Invalid unit
  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  // Test 3: Invalid number
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  // Test 4: Invalid number AND unit
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  // Test 5: No number
  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
