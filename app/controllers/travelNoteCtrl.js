'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                              * 获取游记列表
                                                                                                                                                                              * @param {*} ctx 
                                                                                                                                                                              * @param {*} next 
                                                                                                                                                                              */
var list = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var params, limit, pageIndex, type, sql, data, count;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            params = ctx.request.body;
            limit = params.limit, pageIndex = params.pageIndex, type = params.type;
            sql = 'select * from hw_travel_note where type=? ORDER BY id desc limit ?,?';_context.next = 5;return (
              (0, _db_connection.query)(sql, [type, (pageIndex - 1) * limit, limit]));case 5:data = _context.sent;_context.next = 8;return (
              (0, _db_connection.query)('select count(*) as count from hw_travel_note where type=?', [type]));case 8:count = _context.sent;
            ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 10:case 'end':return _context.stop();}}}, _callee, undefined);}));return function list(_x, _x2) {return _ref.apply(this, arguments);};}();exports.default =


{
  list: list };module.exports = exports['default'];

//# sourceMappingURL=travelNoteCtrl.js.map