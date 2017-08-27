'use strict';exports.__esModule = true;var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _db_connection = require('../models/db_connection');
var _uitil = require('../uitil');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                * 添加
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
            ctx.body = { code: 0, message: '保单填写成功', data: data };case 17:case 'end':return _context.stop();}}}, _callee, undefined);}));return function add(_x, _x2) {return _ref.apply(this, arguments);};}();





/**
                                                                                                                                                                                                                  * 获取列表,管理后台使用
                                                                                                                                                                                                                  * @param {*} ctx
                                                                                                                                                                                                                  * @param {*} next
                                                                                                                                                                                                                  */
var list_search = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {var params, admin_id, activity_id, user_name, mobile, limit, pageIndex, type, where, where_sql, first, item, value, activities, sql, data, count;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            params = ctx.request.body;
            admin_id = params.admin_id, activity_id = params.activity_id, user_name = params.user_name, mobile = params.mobile, limit = params.limit, pageIndex = params.pageIndex, type = params.type;
            where = {};
            if (activity_id) {
              where['activity_id'] = activity_id;
            }

            if (user_name) {
              where['user_name'] = user_name;
            }

            if (mobile) {
              where['mobile'] = mobile;
            }

            where_sql = '';
            first = true;
            for (item in where) {
              value = where[item];
              if (first) {
                where_sql = 'where A.' + item + ' like "%' + value + '%"';
                first = false;
              } else
              {
                where_sql = where_sql + ' and A.' + item + ' like "%' + value + '%"';
              }
            }

            activities = [];if (!(
            admin_id && admin_id != 0)) {_context2.next = 19;break;}_context2.next = 13;return (
              (0, _db_connection.query)('select id from hw_activity where admin_id=' + admin_id));case 13:activities = _context2.sent;
            activities = activities.map(function (item) {return item.id;});
            console.log('activities', activities);
            if (activities.length == 0) {
              activities = 0;
            }
            console.log('-----', activities);
            if (first) {
              where_sql = 'where activity_id in (' + activities + ')';
              first = false;
            } else
            {
              where_sql = where_sql + ' and activity_id in (' + activities + ')';
            }case 19:


            sql = 'select A.*, B.title from hw_insurance as A join hw_activity as B \n    on A.activity_id=B.id ' +
            where_sql + ' limit ' + (pageIndex - 1) * limit + ',' + limit;

            console.log('insurance_list_search_sql:', sql);_context2.next = 23;return (
              (0, _db_connection.query)(sql));case 23:data = _context2.sent;_context2.next = 26;return (




              (0, _db_connection.query)('select count(*) as count from hw_insurance as A ' + where_sql));case 26:count = _context2.sent;

            ctx.body = (0, _assign2.default)({ code: 0, message: 'success', 'data': data }, (0, _uitil.pagination)(limit, pageIndex, count[0].count));case 28:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function list_search(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.default =


{
  add: add,
  list_search: list_search };module.exports = exports['default'];

//# sourceMappingURL=noteCtrl.js.map