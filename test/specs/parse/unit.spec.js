'use strict';

var assert = require('chai').assert;

var parse = require('./../../../src/parse');

describe('parse/unit', function () {

  it('should extract controller', function () {
    var source =
    "angular" +
    " .module('test', [])" +
    " .controller('TestController', function ($scope) {});";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'TestController',
      module: { name: 'test' },
      deps: [{ name: '$scope' }]
    }]);
  });

  it('should extract controller from IIFE', function () {
    var source =
    "(function () {" +
    " angular" +
    "   .module('test', [])" +
    "   .controller('TestController', function ($scope) {});" +
    "}())";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'TestController',
      module: { name: 'test' },
      deps: [{ name: '$scope' }]
    }]);
  });

  it('should extract multiple controllers for one module', function () {
    var source =
    "angular.module('test', [])" +
    ".controller('Test1Controller', function () {})" +
    ".controller('Test2Controller', function () {})" +
    ".controller('Test3Controller', function () {})";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'Test1Controller',
      module: { name: 'test' },
      deps: []
    }, {
      type: 'controller',
      name: 'Test2Controller',
      module: { name: 'test' },
      deps: []
    }, {
      type: 'controller',
      name: 'Test3Controller',
      module: { name: 'test' },
      deps: []
    }]);
  });

  it('should extract controller from a function declaration', function () {
    var source =
    "angular.module('test', []).controller('TestController', TestController);" +
    "function TestController($scope) {}";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'TestController',
      module: { name: 'test' },
      deps: [{ name: '$scope' }]
    }]);
  });

  it('should extract controller from a function expression', function () {
    var source =
    "angular.module('test', []).controller('TestController', TestController);" +
    "var TestController = function ($scope) {};"

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'TestController',
      module: { name: 'test' },
      deps: [{ name: '$scope' }]
    }]);
  });

  it('should extract controller from a parent scope', function () {
    var source =
    "function TestController($scope) {}" +
    "(function () {" +
    "angular.module('test', []).controller('TestController', TestController);" +
    "}());";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'controller',
      name: 'TestController',
      module: { name: 'test' },
      deps: [{ name: '$scope' }]
    }]);
  });

  it('should extract a service', function () {
    var source =
    "angular.module('test', [])" +
    ".service('TestService', function ($http) {});";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'service',
      name: 'TestService',
      module: { name: 'test' },
      deps: [{ name: '$http' }]
    }]);
  });

  it('should extract directive', function () {
    var source =
    "angular.module('test', [])" +
    ".directive('TestDirective', function ($interval) {});";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'directive',
      name: 'TestDirective',
      module: { name: 'test' },
      deps: [{ name: '$interval' }]
    }]);
  });

  it('should extract filter', function () {
    var source =
    "angular.module('test', [])" +
    ".filter('testFilter', function () {});";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'filter',
      name: 'testFilter',
      module: { name: 'test' },
      deps: []
    }]);
  });

  it('should extract constant', function () {
    var source =
    "angular.module('test', [])" +
    ".constant('TEST', 'test');";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'constant',
      name: 'TEST',
      module: { name: 'test' },
      deps: []
    }]);
  });

  it('should extract value', function () {
    var source =
    "angular.module('test', [])" +
    ".value('test', 'test');";

    var units = parse(source);

    assert.deepEqual(units, [{
      type: 'value',
      name: 'test',
      module: { name: 'test' },
      deps: []
    }]);
  });

});