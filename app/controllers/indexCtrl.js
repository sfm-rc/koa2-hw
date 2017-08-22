'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _db_connection = require('../models/db_connection');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(

  function _callee(ctx, next) {var title, sql, dataList;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            title = 'koa2 title';
            // con.connect(function(err) {
            //   if (err) throw err;
            //   con.query("SELECT * FROM hw_activity", function (err, result, fields) {
            //     if (err) throw err;
            //     console.log(result);
            //   });
            // });

            // await ctx.render('index', {
            //   title
            // })
            sql = 'SELECT * FROM hw_activity';_context.next = 4;return (
              (0, _db_connection.query)(sql));case 4:dataList = _context.sent;
            ctx.body = dataList;case 6:case 'end':return _context.stop();}}}, _callee, undefined);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();module.exports = exports['default'];
//# sourceMappingURL=indexCtrl.js.map