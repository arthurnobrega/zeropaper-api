"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ZeroPaper =
/*#__PURE__*/
function () {
  function ZeroPaper(_ref) {
    var username = _ref.username,
        password = _ref.password;

    _classCallCheck(this, ZeroPaper);

    _defineProperty(this, "credentials", null);

    _defineProperty(this, "loginToken", null);

    this.credentials = {
      username: username,
      password: password
    };
  }

  _createClass(ZeroPaper, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var url, response, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = 'https://accounts.zeropaper.com.br/access_client/sign_in';
                _context.next = 3;
                return (0, _nodeFetch.default)(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': ' application/json',
                    intuit_sessionid: 'ACBDC15C8FE44B5AA8482812CB6541CA'
                  },
                  body: JSON.stringify(this.credentials)
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                json = _context.sent;
                this.isLoggedIn = true;
                this.loginToken = json.iamTicket.ticket;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getTransactions",
    value: function () {
      var _getTransactions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref2) {
        var companyId, start, end, query, url, response, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                companyId = _ref2.companyId, start = _ref2.start, end = _ref2.end;
                query = _querystring.default.stringify({
                  company_id: companyId,
                  'filter[start_date]': start,
                  'filter[end_date]': end
                });
                url = "https://api.zeropaper.com.br/v2/transactions?".concat(query);
                _context2.next = 5;
                return (0, _nodeFetch.default)(url, {
                  headers: {
                    'X-Application-Uid': '73d4a5202a0101df4ccd770fd645f9b53e2d1efd3108748a122ff5bafe10a6ab',
                    Authorization: "Intuit_IAM_Authentication intuit_userid=193514544004679,intuit_token=".concat(this.loginToken, ",intuit_realmid=193514586571929")
                  }
                });

              case 5:
                response = _context2.sent;
                _context2.next = 8;
                return response.json();

              case 8:
                json = _context2.sent;
                return _context2.abrupt("return", json.response);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getTransactions(_x) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: "updateTransaction",
    value: function () {
      var _updateTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id, body) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "https://api.zeropaper.com.br/v1/transactions/".concat(id);
                _context3.next = 3;
                return (0, _nodeFetch.default)(url, {
                  method: 'PATCH',
                  body: JSON.stringify(body),
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Application-Uid': '73d4a5202a0101df4ccd770fd645f9b53e2d1efd3108748a122ff5bafe10a6ab',
                    Authorization: "Intuit_IAM_Authentication intuit_userid=193514544004679,intuit_token=".concat(this.loginToken, ",intuit_realmid=193514586571929")
                  }
                });

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", response.ok);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateTransaction(_x2, _x3) {
        return _updateTransaction.apply(this, arguments);
      }

      return updateTransaction;
    }()
  }]);

  return ZeroPaper;
}();

exports.default = ZeroPaper;
//# sourceMappingURL=index.js.map