'use strict';

var assert = require('chai').assert;
var sinon = require("sinon");

var configModule = require('./../../../src/config/default');

describe('config/default', function () {

  it('should be an exportable node module in form of a function', function () {
    assert.isFunction(configModule);
  });

  it('should call config setter', function () {
    var spy = sinon.spy();
    var configStub = { set: spy };
    configModule(configStub);
    assert.ok(spy.called);
  });

});