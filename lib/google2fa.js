'use strict';

var _authenticator = require('otplib/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _similarweb = require('../../similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_authenticator2.default.options = { crypto: _crypto2.default };

while (true) {
  var token = _authenticator2.default.generate(_similarweb2.default.secret);
  process.stdout.write(token);
  process.stdout.write('\b\b\b\b\b\b');
}