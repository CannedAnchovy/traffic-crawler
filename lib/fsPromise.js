'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = exports.writeFile = exports.readFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = exports.readFile = _util2.default.promisify(_fs2.default.readFile);
var writeFile = exports.writeFile = _util2.default.promisify(_fs2.default.writeFile);
var access = exports.access = _util2.default.promisify(_fs2.default.access);