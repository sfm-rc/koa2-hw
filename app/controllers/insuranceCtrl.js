'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                * 填写保险
                                                                                                                                * @param {*} ctx 
                                                                                                                                * @param {*} next 
                                                                                                                                */
var add = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {var params, activity_id, user_name, cer_type, cer_id, sex, birth, mobile, e_contact, e_contact_mobile, exit_sql, exit_data, sql, data;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        params = ctx.request.body;
                        activity_id = params.activity_id, user_name = params.user_name, cer_type = params.cer_type, cer_id = params.cer_id, sex = params.sex, birth = params.birth, mobile = params.mobile, e_contact = params.e_contact, e_contact_mobile = params.e_contact_mobile;

                        exit_sql = 'select * from hw_insurance where activity_id=\'' + activity_id + '\' and cer_id=\'' + cer_id + '\'';_context.next = 5;return (
                            (0, _db_connection.query)(exit_sql));case 5:exit_data = _context.sent;if (!(
                        exit_data.length > 0)) {_context.next = 11;break;}
                        ctx.body = { code: 1, message: '保单已经填写', exit_data: exit_data };return _context.abrupt('return');case 11:




                        sql = 'INSERT into hw_insurance VALUES(\n                NULL,\'' +
                        activity_id + '\',\'' + user_name + '\', \'' + cer_type + '\', \'' + cer_id + '\', \'' + sex + '\', \'' + birth + '\', \'' + mobile + '\', \n                \'' +
                        e_contact + '\', \'' + e_contact_mobile + '\', \'' + (0, _uitil.getLinuxTimeStamp)() + '\'\n            )';_context.next = 14;return (

                            (0, _db_connection.query)(sql));case 14:data = _context.sent;
                        console.log('insert hw_insurance:', data);
                        ctx.body = { code: 0, message: '保单填写成功', data: data };case 17:case 'end':return _context.stop();}}}, _callee, undefined);}));return function add(_x, _x2) {return _ref.apply(this, arguments);};}();exports.default =




{
    add: add };module.exports = exports['default'];

//# sourceMappingURL=insuranceCtrl.js.map